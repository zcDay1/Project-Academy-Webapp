import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import pa_logo from './pa_logo.svg';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className='Navbar'>
            <div className='Navbar_LHS'>
                <button className='Navbar_Backbutton' onClick={() => navigate(-1)}>
                    <img className='Navbar_Backbutton_Image' src={require('./back.png')} alt=""></img>
                </button>
            </div>
            <div className='Navbar_Center'>
                <img className='Navbar_Logo' src={pa_logo} alt='Project Academy'></img>
            </div>
            <div className='Navbar_RHS'></div>
        </nav>
    );
}

export default Navbar;