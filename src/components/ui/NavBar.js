import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Navbar = () => {

    const navigate = useNavigate();

    const { user, dispatch } = useContext( AuthContext );

    const handleLogout = () => {
        
        const action ={
           type: types.logout,
        }
      
        dispatch(action);
        
        navigate('/login', {
            replace: true
          });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav container-fluid">

                    <NavLink 
                        className={ ( {isActive} ) => 'nav-item nav-link btn' +  (isActive ? 'active' : '') }
                        to="/marvel"
                        aria-current="page"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ( {isActive} ) => 'nav-item nav-link btn' +  (isActive ? 'active' : '') }
                        to="/dc"
                        aria-current="page"
                    >
                        DC
                    </NavLink>
                    <NavLink 
                        className={ ( {isActive} ) => 'nav-item nav-link btn' +  (isActive ? 'active' : '') }
                        to="/search"
                        aria-current="page"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span
                        className="nav-item nav-link text-info"
                    > 
                        { user.name }
                    </span>
                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}