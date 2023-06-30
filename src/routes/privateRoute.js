import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from "../redux/hooks";
import { Header } from '../components/header';


export const PrivateRoute = () => {
    const auth = JSON.parse(`${localStorage.getItem('token')}`); 
    if (auth?.token) {
        return (
            <>
            <Header/>
            <main>
            <Outlet />
            </main>
            </>             
        )
    }
    else {
        return <Navigate to='/login' />
    }
}