import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ContactContext } from "../context/ContactContext"
import Modal from "./Modal"

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteContact(contact.id)
      setShowModal(false)
    } catch (error) {
      console.error(error)
      alert("Error al eliminar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-4">
      <div className="card p-3 mb-3">
        <h5>{contact.name}</h5>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.address}</p>

        {/* 🔥 botones mejor organizados */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-warning"
            onClick={() => navigate("/add", { state: { contact } })}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* 🔥 Modal */}
      {showModal && (
        <Modal
          title="Eliminar contacto"
          message="¿Estás segura que deseas eliminar este contacto?"
          onConfirm={handleDelete}
          onClose={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  )
}

export default ContactCard