import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ContactContext } from "../context/ContactContext"

const AddContact = () => {
  const { createContact } = useContext(ContactContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔥 validación básica
    if (!form.name || !form.email) {
      alert("Nombre y email son obligatorios")
      return
    }

    await createContact(form)

    // limpiar form
    setForm({
      name: "",
      email: "",
      phone: "",
      address: ""
    })

    // redirigir
    navigate("/")
  }

  return (
    <div className="container mt-5">
      <h2>Add Contact</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="form-control mb-2"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="form-control mb-2"
          value={form.address}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  )
}

export default AddContact




// export const AddContact = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit} className="form">

//         <label>Full Name</label>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <button type="submit">Save</button>

//       </form>
//     </div>
//   );
// };