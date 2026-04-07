const Modal = ({ title, message, onConfirm, onClose, loading = false }) => {
  return (
    <>
      {/* 🔥 BACKDROP */}
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      ></div>

      {/* 🔥 MODAL */}
      <div className="modal d-block fade show" tabIndex="-1">
        <div
          className="modal-dialog"
          onClick={(e) => e.stopPropagation()} // evitar cierre interno
        >
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Modal