import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

const AddContact = () => {
  const { createContact, updateContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const location = useLocation();

  const editingContact = location.state?.contact || null;

  const [form, setForm] = useState({
    name: "", // 👈 Cambiado a full_name para la API
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (editingContact) {
      setForm({
        name: editingContact.name || "",
        email: editingContact.email || "",
        phone: editingContact.phone || "",
        address: editingContact.address || "",
        id: editingContact.id
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (editingContact) {
      const { id, ...data } = form; 
      await updateContact(id, data);
    } else {
      await createContact(form);
    }

    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "1100px" }}>
      <h1 className="text-center mb-4">
        {editingContact ? "Edit contact" : "Add a new contact"}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* Botón Guardar / Save */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-lg">
            save
          </button>
        </div>
      </form>

      {/* Link de retorno */}
      <div className="mt-2 text-start fs-6">
        <Link to="/">
          Get back to contacts
        </Link>
      </div>
    </div>
  );
};

export default AddContact;




