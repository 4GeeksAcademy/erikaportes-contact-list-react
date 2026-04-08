import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const navigate = useNavigate();

  const name = contact.full_name || contact.name || "Sin nombre";
  const address = contact.address || "Sin dirección";
  const phone = contact.phone || "Sin teléfono";
  const email = contact.email || "Sin email";

  // Imagen segura
  const imageId = contact.id ? Number(contact.id) + 10 : 1;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este contacto?");
    
    if (confirmDelete) {
      try {
        await deleteContact(contact.id);
      } catch (error) {
        console.error("Error eliminando contacto:", error);
      }
    }
  };

  const handleEdit = () => {
    navigate("/add", { state: { contact } });
  };

  return (
    <div className="list-group-item p-4">
      <div className="d-flex align-items-center">
        
        {/* Foto de Perfil */}
        <div className="flex-shrink-0 me-4">
          <img
            src={`https://picsum.photos/id/${imageId}/200/200`}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "110px", height: "110px", objectFit: "cover" }}
          />
        </div>

        {/* Información */}
        <div className="flex-grow-1">
          <h5 className="mb-2 fs-4">{name}</h5>
          
          <div className="text-secondary mb-1">
            <i className="fa-solid fa-location-dot me-3"></i>
            <span>{address}</span>
          </div>
          
          <div className="text-secondary mb-1">
            <i className="fa-solid fa-phone-flip me-3"></i>
            <span>{phone}</span>
          </div>
          
          <div className="text-secondary">
            <i className="fa-solid fa-envelope me-3"></i>
            <span>{email}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="d-flex align-items-start align-self-start mt-1">
          <button 
            className="btn btn-link text-dark p-0 me-4"
            onClick={handleEdit}
            style={{ fontSize: "1.2rem" }}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>

          <button 
            className="btn btn-link text-dark p-0"
            onClick={handleDelete}
            style={{ fontSize: "1.2rem" }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactCard;






