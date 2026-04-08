import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import ContactCard from "../components/ContactCard";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const { contacts, loading } = useContext(ContactContext);
  const navigate = useNavigate();

  if (loading) {
    return <p className="text-center mt-5">Cargando contactos...</p>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate("/add")}
        >
          Add new contact
        </button>
      </div>

      <div className="border rounded shadow-sm">
        {contacts.length === 0 ? (
          <p className="p-3 mb-0">No hay contactos disponibles</p>
        ) : (
          <div className="list-group list-group-flush">
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;



// import { useContext } from "react"
// import { ContactContext } from "../context/ContactContext"
// import ContactCard from "../components/ContactCard"
// import { useNavigate } from "react-router-dom"

// const Contacts = () => {
//   const { contacts, loading } = useContext(ContactContext)
//   const navigate = useNavigate()

//   if (loading) {
//     return <p className="text-center mt-5">Cargando contactos...</p>
//   }

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center">
//         <h2>Contact List</h2>

//         <button
//           className="btn btn-success"
//           onClick={() => navigate("/add")}
//         >
//           Add Contact
//         </button>
//       </div>

//       {contacts.length === 0 ? (
//         <p>No hay contactos disponibles</p>
//       ) : (
//         <div className="row">
//           {contacts.map(contact => (
//             <ContactCard key={contact.id} contact={contact} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Contacts