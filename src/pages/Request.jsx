import React from 'react';
import './Request.css'
import MyNavabar from '../components/MyNavabar/MyNavabar';
import RequestNavbar from './RequestNavbar';
import MainTitle from '../components2/MainTitle';

const Request = () => {
    return (
        <div>
            <MainTitle label='درخواست ها'/>
            <RequestNavbar/>
        </div>
    );
};

export default Request;