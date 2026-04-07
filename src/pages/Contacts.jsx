import { useContext } from "react"
import { ContactContext } from "../context/ContactContext"
import ContactCard from "../components/ContactCard"

const Contacts = () => {
  const { contacts, loading, error } = useContext(ContactContext)

  if (loading) {
    return <p className="text-center mt-5">Cargando contactos...</p>
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>
  }

  return (
    <div className="container mt-5">
      <h2>Contact List</h2>

      {contacts.length === 0 ? (
        <p>No hay contactos disponibles</p>
      ) : (
        <div className="row">
          {contacts.map(contact => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Contacts