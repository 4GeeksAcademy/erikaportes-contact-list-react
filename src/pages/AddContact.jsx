import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/ContactContext";

export const AddContact = () => {
  const { addContact, updateContact, contacts } = useContacts();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contact = contacts.find((c) => c.id === parseInt(id));
      if (contact) setForm(contact);
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      updateContact(form);
    } else {
      addContact(form);
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h1>{id ? "Edit Contact" : "Add Contact"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>

      <button onClick={() => navigate("/")}>
        Back to contacts
      </button>
    </div>
  );
};




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