import React from 'react';
import { Navigate } from 'react-router-dom';
// برای قسمت ادمین است
const PrivateRoute = ({children}) => {

    const userRole=JSON.parse(localStorage.getItem('userRole'))
    return (
        <div>
            {userRole ==='Admin' ? children: <Navigate to='/'/>}
        </div>
    );
};

export default PrivateRoute;