import { Link } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
  const { contacts } = useContacts();

  return (
    <div className="container">
      <h1>Contact List</h1>

      <Link to="/add">
        <button className="btn">Add new contact</button>
      </Link>

      {contacts.length === 0 ? (
        <p>No hay contactos</p>
      ) : (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};




// export const Card = ({ name, address, phone, image }) => {
//   return (
//     <div className="card">
//       <div className="card-content">
//         <img src={image} alt="profile" className="card-img" />

//         <div className="card-info">
//           <h2>{name}</h2>

//           <p className="card-text">
//             📍 {address}
//           </p>

//           <p className="card-text">
//             📞 {phone}
//           </p>
//         </div>

//         <div className="card-actions">
//           <span className="icon">✏️</span>
//           <span className="icon">🗑️</span>
//         </div>
//       </div>
//     </div>
//   );
// };
