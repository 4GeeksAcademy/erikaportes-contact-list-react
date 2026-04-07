import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

export const ContactCard = ({ contact }) => {
  const { deleteContact } = useContacts();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("¿Seguro que deseas eliminar este contacto?")) {
      deleteContact(contact.id);
    }
  };

  return (
    <div className="card">
      <img src="https://i.pravatar.cc/100" alt="avatar" />

      <div className="info">
        <h3>{contact.name}</h3>
        <p>📍 {contact.address}</p>
        <p>📞 {contact.phone}</p>
        <p>✉️ {contact.email}</p>
      </div>

      <div className="actions">
        <button onClick={() => navigate(`/edit/${contact.id}`)}>
          ✏️
        </button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};