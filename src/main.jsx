import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ContactProvider } from "./context/ContactContext.jsx";

const Main = () => {
    return (
        <React.StrictMode>  
                <ContactProvider>
                    <RouterProvider router={router} />
                </ContactProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);