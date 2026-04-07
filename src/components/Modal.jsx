export const Modal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>¿Seguro que deseas eliminar?</p>
        <button onClick={onConfirm}>Sí</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};