import { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

const BASE_URL = "https://playground.4geeks.com/contact/agendas";
const AGENDA = "erikaportes"; // ⚠️ CAMBIA si usas otro nombre

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  // ✅ Obtener contactos
  const getContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${AGENDA}/contacts`);
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts || []);
      } else {
        console.error("Error al obtener contactos:", data);
      }
    } catch (error) {
      console.error("Error en getContacts:", error);
    }
  };

  // ✅ Crear agenda si no existe
  const createAgenda = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${AGENDA}`, {
        method: "POST"
      });

      if (!response.ok) {
        console.log("Agenda ya existe o error al crearla");
      }
    } catch (error) {
      console.error("Error creando agenda:", error);
    }
  };

  // ✅ Crear contacto
  const createContact = async (contact) => {
    try {
      const response = await fetch(`${BASE_URL}/${AGENDA}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });

      if (response.ok) {
        await getContacts();
      } else {
        const error = await response.json();
        console.error("Error al crear contacto:", error);
      }
    } catch (error) {
      console.error("Error en createContact:", error);
    }
  };

  // ✅ Actualizar contacto
  const updateContact = async (contact) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${AGENDA}/contacts/${contact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contact)
        }
      );

      if (response.ok) {
        await getContacts();
      } else {
        const error = await response.json();
        console.error("Error al actualizar:", error);
      }
    } catch (error) {
      console.error("Error en updateContact:", error);
    }
  };

  // ✅ Eliminar contacto
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${AGENDA}/contacts/${id}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        await getContacts();
      } else {
        const error = await response.json();
        console.error("Error al eliminar:", error);
      }
    } catch (error) {
      console.error("Error en deleteContact:", error);
    }
  };

  // ✅ Inicialización
  useEffect(() => {
    const init = async () => {
      await createAgenda();
      await getContacts();
    };
    init();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        getContacts,
        createContact,
        updateContact,
        deleteContact
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};