import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute1 = ({children}) => {
    const userRole=JSON.parse(localStorage.getItem('userRole'))
    return (
        <div>
            {userRole ==='User' ? children: <Navigate to='/'/>}
            
        </div>
    );
};

export default PrivateRoute1;