

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {  Link, NavLink } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "./Loading";

const Navbar = () => {
    const [ user, loading ] = useAuthState(auth)
    if(loading){
        return <Loading/>
    }
    const handleSignOut = () =>{
        signOut(auth);
    }

    const menuItems = <>
        <li> <NavLink to="/home" className="rounded-lg mr-3">Home</NavLink> </li>
        
        {
            user && <li><NavLink to="/dashboard" className="rounded-lg mr-3">Dashboard </NavLink></li>
        }

        {
        user? <li><button className="rounded-lg mr-5" onClick={handleSignOut} >Sign Out</button></li> :
        <li> <NavLink to="/login" className="rounded-lg mr-5"> Login </NavLink> </li> 
        }
    </>


    return (
        <div className="navbar bg-purple-300 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content  shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl">BFSA MANAGEMENT  </Link>
            </div>

            <div className="navbar-end hidden lg:flex   ">
                <ul className="menu menu-horizontal  ">
                    {menuItems}
                </ul>
            </div>

            <div className='flex '>
                <label tabIndex="1" for="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http:www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;