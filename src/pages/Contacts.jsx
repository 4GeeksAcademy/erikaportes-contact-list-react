import { useContext } from "react"
import { ContactContext } from "../context/ContactContext"
import ContactCard from "../components/ContactCard"

const Contacts = () => {
  const { contacts, loading } = useContext(ContactContext)

  return (
    <div className="container mt-5">
      <h2>Contact List</h2>

      {loading && <p>Cargando contactos...</p>}

      {!loading && contacts.length === 0 && (
        <p>No hay contactos disponibles</p>
      )}

      <div className="row">
        {contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  )
}

export default Contacts




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
