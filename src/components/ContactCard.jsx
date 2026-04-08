const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="list-group-item p-4">
      <div className="d-flex align-items-center">
        {/* Imagen representativa */}
        <div className="me-4">
          <img 
            src="https://picsum.photos/100" 
            className="rounded-circle" 
            alt="profile" 
            style={{width: "100px", height: "100px"}} 
          />
        </div>

        {/* Info - Usamos full_name */}
        <div className="flex-grow-1">
          <h5 className="mb-1">{contact.name}</h5>
          <p className="mb-1 text-muted"><i className="bi bi-geo-alt-fill me-2"></i>{contact.address}</p>
          <p className="mb-1 text-muted"><i className="bi bi-telephone-fill me-2"></i>{contact.phone}</p>
          <p className="mb-0 text-muted"><i className="bi bi-envelope-fill me-2"></i>{contact.email}</p>
        </div>

        {/* Acciones */}
        <div className="d-flex">
          <button
            className="btn btn-link text-dark me-3"
            onClick={() => navigate("/add", { state: { contact } })}
          >
            <i className="fa-solid fa-pencil"></i> Editar
          </button>
          <button
            className="btn btn-link text-danger"
            onClick={() => setShowModal(true)}
          >
            <i className="fa-solid fa-trash"></i> Borrar
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          onConfirm={() => deleteContact(contact.id)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};





