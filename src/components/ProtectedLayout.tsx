// components/ProtectedLayout.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";

const ProtectedLayout: React.FC = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    // Wybrane ścieżki, na których nie wyświetlamy Navbar
    const hideNavbarRoutes = ['/login', '/register'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <Outlet />
        </>
    );
};

export default ProtectedLayout;
