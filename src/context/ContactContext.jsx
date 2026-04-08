import { createContext, useState, useEffect } from "react"

export const ContactContext = createContext()

const API_URL = "https://playground.4geeks.com/contact/agendas/erika"

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  //  Obtener contactos
  const getContacts = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL + "/contacts")

      if (!res.ok) throw new Error("Error fetching contacts")

      const data = await res.json()
      setContacts(data.contacts ?? [])
    } catch (error) {
      console.error("getContacts:", error)
      setContacts([]) // fallback seguro
    } finally {
      setLoading(false)
    }
  }

  //  Crear contacto
  const createContact = async (contact) => {
    try {
      const res = await fetch(API_URL + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      })

      if (!res.ok) throw new Error("Error creating contact")

      await getContacts()
      return true
    } catch (error) {
      console.error("createContact:", error)
      throw error
    }
  }

  //  Actualizar contacto
  const updateContact = async (id, updatedData) => {
    try {
      const res = await fetch(API_URL + "/contacts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      })

      if (!res.ok) throw new Error("Error updating contact")

      await getContacts()
      return true
    } catch (error) {
      console.error("updateContact:", error)
      throw error
    }
  }

  //  Eliminar contacto
  const deleteContact = async (id) => {
    try {
      const res = await fetch(API_URL + "/contacts/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })

      if (!res.ok) throw new Error("Error deleting contact")

      await getContacts()
      return true
    } catch (error) {
      console.error("deleteContact:", error)
      throw error
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
        updateContact, 
        deleteContact
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}