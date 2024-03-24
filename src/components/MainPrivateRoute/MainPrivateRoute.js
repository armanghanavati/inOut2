import React, { Children } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const MainPrivateRoute = () => {
    const navigate=useNavigate()
    const token=JSON.parse(localStorage.getItem('token'))
    const userRole=JSON.parse(localStorage.getItem('userRole'))
    return (
        <div>
            {/* {token && userRole==='Admin' && <Navigate to='/adminlogin'/>} */}
            {/* {token && userRole==='User' && <Navigate to='/home'/>} */}
            {/* {!token && !userRole && <Navigate to ='/'/>} */}
        </div>
    );
};

export default MainPrivateRoute;