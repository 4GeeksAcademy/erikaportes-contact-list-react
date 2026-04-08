import { useState } from "react"

const Modal = ({ title, message, onConfirm, onClose }) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
    } catch (error) {
      console.error(error)
      alert("Error al eliminar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button
              className="btn btn-danger"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Modal