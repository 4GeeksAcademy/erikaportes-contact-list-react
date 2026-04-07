import { useContext, useState } from "react"
import { ContactContext } from "../context/ContactContext"
import Modal from "./Modal"

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext)
  const [showModal, setShowModal] = useState(false)

  const handleDelete = async () => {
    await deleteContact(contact.id)
    setShowModal(false)
  }

  return (
    <div className="col-md-4">
      <div className="card p-3 mb-3">
        <h5>{contact.name}</h5>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.address}</p>

        <button
          className="btn btn-danger"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      {showModal && (
        <Modal
          title="Eliminar contacto"
          message="¿Estás segura que deseas eliminar este contacto?"
          onConfirm={handleDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default ContactCard