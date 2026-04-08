import { useState, useContext } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";

import { ContactContext } from "../context/ContactContext";



const AddContact = () => {

  const { createContact, updateContact } = useContext(ContactContext);

  const navigate = useNavigate();

  const location = useLocation();

  const editingContact = location.state?.contact || null;



  const [form, setForm] = useState({

    name: editingContact?.name || "", // 🔑 Cambiado a "name"

    email: editingContact?.email || "",

    phone: editingContact?.phone || "",

    address: editingContact?.address || ""

  });



  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!form.name.trim() || !form.email.trim()) {

      alert("Nombre y correo electrónico son obligatorios");

      return;

    }



    setLoading(true);

    try {

      if (editingContact) {

        await updateContact(editingContact.id, form);

      } else {

        await createContact(form);

      }

      navigate("/", { replace: true });

    } catch (error) {

      console.error("Error al guardar el contacto:", error);

      alert("Ocurrió un error al guardar el contacto");

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="container mt-5" style={{ maxWidth: "800px" }}>

      <h1 className="text-center mb-4 fw-bold">

        {editingContact ? "Editar contacto" : "Agregar nuevo contacto"}

      </h1>



      <form onSubmit={handleSubmit}>

        {/* Name */}

        <div className="mb-3">

          <label className="form-label fw-bold">Nombre completo</label>

          <input

            type="text"

            name="name"

            className="form-control form-control-md"

            placeholder="Nombre completo"

            value={form.name}

            onChange={handleChange}

          />

        </div>



        {/* Email */}

        <div className="mb-3">

          <label className="form-label fw-bold">Correo electrónico</label>

          <input

            type="email"

            name="email"

            className="form-control form-control-md"

            placeholder="Ingresa tu correo electrónico"

            value={form.email}

            onChange={handleChange}

          />

        </div>



        {/* Phone */}

        <div className="mb-3">

          <label className="form-label fw-bold">Teléfono</label>

          <input

            type="text"

            name="phone"

            className="form-control form-control-md"

            placeholder="Ingresa tu teléfono"

            value={form.phone}

            onChange={handleChange}

          />

        </div>



        {/* Address */}

        <div className="mb-3">

          <label className="form-label fw-bold">Dirección</label>

          <input

            type="text"

            name="address"

            className="form-control form-control-md"

            placeholder="Ingresa tu dirección"

            value={form.address}

            onChange={handleChange}

          />

        </div>



        {/* Botón Guardar */}

        <div className="d-grid gap-2">

          <button

            type="submit"

            className="btn btn-primary btn-lg"

            disabled={loading}

          >

            {loading ? "Guardando..." : editingContact ? "Actualizar" : "Guardar"}

          </button>

        </div>



        <div className="mt-2 text-center">

          <Link to="/" className="text-decoration-none">

            Regresar a la lista de contactos

          </Link>

        </div>

      </form>

    </div>

  );

};



export default AddContact
