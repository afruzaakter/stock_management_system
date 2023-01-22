import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "./Loading";
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { BsPinFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiFillTool } from 'react-icons/ai';

const Navbar = () => {
    const [user, loading] = useAuthState(auth)
    if (loading) {
        return <Loading />
    }
    // console.log(user)
    const handleSignOut = () => {
        signOut(auth);
    }

    const menuItems = <>
        <li> <NavLink to="/home" className="rounded-lg mr-3">Home</NavLink> </li>

        {
            user && <li><NavLink to="/dashboard" className="rounded-lg mr-3">Dashboard </NavLink></li>
        }


    </>

    const profile = <>
        {
            user ?
                <span className='flex items-center'>

                    <img className='w-12 h-12 mr-1 rounded-full cursor-pointer' src={user.photoURL} alt="" />{user.displayName}</span> :
                <li className='m-4' > <NavLink className="rounded-lg " to='/login'> Login </NavLink> </li>
        }
    </>


    return (
        <div className="navbar bg-purple-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {/* ------------------ User Profile Responsive Mobile Device ------- */}
                    <ul tabIndex="0" className="menu menu-compact dropdown-content  shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                        <div className="dropdown dropdown-end ">
                            <label tabIndex="0" className="flex justify-between items-end  m-1">{profile}</label>
                            <ul tabIndex="0" className="dropdown-content menu p-2 w-52">
                                <li className='text-primary mb-2 font-bold '><NavLink to='/profile'> <FaUserCircle /> Profile</NavLink></li>
                                <li className='text-primary mb-2 font-bold '><NavLink to='/profileEdit'> <FiSettings />  Setting</NavLink></li>
                                <li className='text-primary  font-bold '><Link to='/dashboard'>
                                    <span className='flex items-center mr-8' onClick={handleSignOut} ><FaSignOutAlt className='mr-2' /> Logout</span>
                                </Link></li>
                            </ul>
                        </div>
                    </ul>
                </div>
                <Link className="text-xl">BFSA  </Link>
            </div>
            
            {/* --------------- User Profile Desktop Device ----------- */}
            <div className="navbar-end hidden lg:flex   ">
                <ul className="menu menu-horizontal  ">
                    {menuItems}

                    <div className="dropdown dropdown-end ">
                        <label tabIndex="0" className="flex justify-between items-end  m-1">{profile}</label>
                        <ul tabIndex="0" className="dropdown-content menu rounded-md p-2 w-64 lg:bg-gray-200">
                            <li className='text-primary mb-2 ml-5 '><NavLink to='/profile'> <FaUserCircle /> Business(es)</NavLink></li>
                            <li className='text-primary mb-2  ml-5'><NavLink to='/profile'> <BsPinFill /> Your Preferences</NavLink></li>
                            <li className='text-primary mb-2  ml-5'><NavLink to='/profile'> <MdEmail /> Sms Preferences</NavLink></li>
                            <li className='text-primary mb-2  ml-5'><NavLink to='/profile'> <AiFillTool /> Manage Profile</NavLink></li>
                            <li className='text-primary mb-2  ml-5'><NavLink to='/profileEdit'> <FiSettings />Change Password</NavLink></li>
                            <li className='text-primary ml-5  mb-2'><Link to='/dashboard'>
                                <span className='flex items-center mr-8' onClick={handleSignOut} ><FaSignOutAlt className='mr-2' /> Sign Out</span>
                            </Link></li>
                        </ul>
                    </div>

                </ul>
            </div>
            
            {/* ---------Dashboard Responsive Mobile Device----------- */}
            <div className='flex'>
                <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http:www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;