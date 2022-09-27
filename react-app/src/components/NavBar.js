
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"
import logo from "./images/icons8-bird-96.png"

const NavBar = () => {
  return (
    <nav>
      <div className='navbar'>
        <div className='logo-div'>
          <img className='logo' alt='logo' src={logo}/>
          chirpchirp
        </div>
        <button >
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </button>

        <LogoutButton />

      </div>
      {/* <ul>
        <li>
          <button >
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          </button>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;
