import { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

const API_URL = "https://playground.4geeks.com/contact/agendas/erika";

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los contactos
  const getContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/contacts`);
      if (!res.ok) throw new Error("Error al obtener contactos");
      const data = await res.json();
      setContacts(data.contacts ?? []);
    } catch (err) {
      console.error("getContacts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo contacto
  const createContact = async (contact) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Error al crear contacto");
      await getContacts(); // actualizar lista
      return true;
    } catch (err) {
      console.error("createContact:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar contacto existente
  const updateContact = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Error al actualizar contacto");
      await getContacts();
      return true;
    } catch (err) {
      console.error("updateContact:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar contacto
  const deleteContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar contacto");
      await getContacts();
      return true;
    } catch (err) {
      console.error("deleteContact:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar contactos al iniciar
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        error,
        getContacts,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};