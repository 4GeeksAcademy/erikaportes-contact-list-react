import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const navigate = useNavigate();

  // ✅ Eliminar contacto
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este contacto?");
    
    if (confirmDelete) {
      await deleteContact(contact.id);
    }
  };

  // ✅ Ir a editar
  const handleEdit = () => {
    navigate("/add", { state: { contact } });
  };

  return (
    <div className="card mb-3 p-3">
      <div className="d-flex justify-content-between align-items-center">

        <div>
          <h5>{contact.name}</h5>
          <p className="mb-1">📧 {contact.email}</p>
          <p className="mb-1">📞 {contact.phone}</p>
          <p className="mb-1">📍 {contact.address}</p>
        </div>

        <div>
          <button 
            className="btn btn-outline-primary me-2"
            onClick={handleEdit}
          >
            ✏️
          </button>

          <button 
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            🗑️
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactCard;





