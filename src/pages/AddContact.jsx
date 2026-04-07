import { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ContactContext } from "../context/ContactContext"

const AddContact = () => {
  const { createContact, updateContact } = useContext(ContactContext)
  const navigate = useNavigate()
  const location = useLocation()

  // 🔥 detectar si estamos editando
  const editingContact = location.state?.contact

  const [form, setForm] = useState({
    name: editingContact?.name || "",
    email: editingContact?.email || "",
    phone: editingContact?.phone || "",
    address: editingContact?.address || ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔥 validación mejorada
    if (!form.name.trim() || !form.email.trim()) {
      alert("Nombre y email son obligatorios")
      return
    }

    if (!form.email.includes("@")) {
      alert("Email inválido")
      return
    }

    setLoading(true)

    try {
      if (editingContact) {
        await updateContact(editingContact.id, form)
      } else {
        await createContact(form)
      }

      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Ocurrió un error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h2>{editingContact ? "Edit Contact" : "Add Contact"}</h2>

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

        <button className="btn btn-primary" disabled={loading}>
          {loading
            ? "Guardando..."
            : editingContact
            ? "Actualizar"
            : "Guardar"}
        </button>
      </form>
    </div>
  )
}

export default AddContact