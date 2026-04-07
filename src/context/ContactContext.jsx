import { createContext, useState, useEffect } from "react"

export const ContactContext = createContext()

const API_URL = "https://playground.4geeks.com/contact"

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  // 📌 Obtener contactos
  const getContacts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/agendas/erika/contacts`)
      if (!res.ok) throw new Error("Error fetching contacts")

      const data = await res.json()
      setContacts(data.contacts || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // 📌 Crear contacto
  const createContact = async (contact) => {
    try {
      const res = await fetch(`${API_URL}/agendas/erika/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      })

      if (!res.ok) throw new Error("Error creating contact")

      await getContacts()
    } catch (error) {
      console.error(error)
    }
  }

  // 📌 Eliminar contacto
  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) throw new Error("Error deleting contact")

      await getContacts()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        getContacts,
        createContact,
        deleteContact
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}