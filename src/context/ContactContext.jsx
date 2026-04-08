import { createContext, useState, useEffect } from "react"

export const ContactContext = createContext()

const API_URL = "https://playground.4geeks.com/contact"
const AGENDA = "erika" // 

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 🔥 helper fetch
  const fetchAPI = async (endpoint, options = {}) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, options)

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || "API Error")
      }

      return await res.json()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // GET
  const getContacts = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchAPI(`/agendas/${AGENDA}/contacts`)
      setContacts(data.contacts || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // CREATE (optimista)
  const createContact = async (contact) => {
    setError(null)

    try {
      const data = await fetchAPI(`/agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      })

      setContacts(prev => [...prev, data.contact])
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // CREATE AGENDA
  const ensureAgenda = async () => {
  try {
    await fetch(`${API_URL}/agendas/${AGENDA}`, {
      method: "POST"
    })
  } catch (e) {
    console.log("Agenda ya existe")
  }
}

  // UPDATE
  const updateContact = async (id, updatedData) => {
    setError(null)

    try {
      await fetchAPI(`/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      })

      setContacts(prev =>
        prev.map(c => (c.id === id ? { ...c, ...updatedData } : c))
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  // DELETE
  const deleteContact = async (id) => {
    setError(null)

    try {
      await fetchAPI(`/contacts/${id}`, {
        method: "DELETE"
      })

      setContacts(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  useEffect(() => {
  ensureAgenda().then(getContacts)
}, [])

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        error,
        getContacts,
        createContact,
        updateContact,
        deleteContact
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}