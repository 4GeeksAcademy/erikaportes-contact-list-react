import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

const AddContact = () => {
  const { createContact, updateContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Si viene contacto → modo edición
  const editingContact = location.state?.contact || null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // ✅ Cargar datos si estás editando
  useEffect(() => {
    if (editingContact) {
      setForm({
        name: editingContact.name || "",
        email: editingContact.email || "",
        phone: editingContact.phone || "",
        address: editingContact.address || "",
        id: editingContact.id // 🔥 IMPORTANTE para update
      });
    }
  }, [editingContact]);

  // ✅ Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (editingContact) {
      await updateContact(form);
    } else {
      await createContact(form);
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h2>{editingContact ? "Editar Contacto" : "Agregar Contacto"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit">
          {editingContact ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <button onClick={() => navigate("/")}>
        Volver
      </button>
    </div>
  );
};

export default AddContact;

