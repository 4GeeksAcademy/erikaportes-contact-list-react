import { createContext, useContext, useState } from "react";

// Crear contexto
const ContactContext = createContext();

// Hook personalizado (para usar el contexto fácil)
export const useContacts = () => useContext(ContactContext);

// Provider
export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    // Agregar contacto
    const addContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    // Eliminar contacto
    const deleteContact = (id) => {
        setContacts(contacts.filter((c, index) => index !== id));
    };

    // Editar contacto
    const updateContact = (id, updatedContact) => {
        const updated = contacts.map((c, index) =>
            index === id ? updatedContact : c
        );
        setContacts(updated);
    };

    return (
        <ContactContext.Provider
            value={{
                contacts,
                addContact,
                deleteContact,
                updateContact
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};