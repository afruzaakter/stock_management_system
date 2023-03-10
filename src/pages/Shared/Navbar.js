import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    const navigate=useNavigate();

    if (loading) {
        return <Loading />
    }
   
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
        // navigate("/login")
    }

    const menuItems = <>
        <li><NavLink to="/dashboard" className="rounded-lg mr-3">Dashboard </NavLink></li>
    </>
    const profileMenu = <>
        {
            user ?
                <span className='flex items-center'>
                    <img className='w-12 h-12 mr-1 rounded-full cursor-pointer bg-gray-300' src={user.photoURL} alt={user.displayName} />
                     {user.displayName}
                </span> : <li className='rounded-lg mr-3' > <NavLink className="rounded-lg " to='/login'> Login </NavLink> </li>
        }
    </>
    const subProfileMenu= <>
        <li> <NavLink to='/business'> <FaUserCircle /> Business(es)</NavLink> </li>
        <li> <NavLink to='/preferences'> <BsPinFill /> Your Preferences</NavLink> </li>
        <li> <NavLink to='/smsPreferences'> <MdEmail /> Sms Preferences</NavLink> </li>
        <li> <NavLink to='/profile'> <AiFillTool /> Manage Profile</NavLink> </li>
        <li> <NavLink to='/changePassword'> <FiSettings />Change Password </NavLink> </li>
        <li className="pl-1">
            <Link to='/dashboard'>
                <span className=' flex items-center ' onClick={handleSignOut} >
                    <FaSignOutAlt className='mr-2' /> Sign Out</span>
            </Link>
        </li>
    </>


    return (
        <div className="navbar bg-purple-300 flex">
            
            <div className="navbar-start"> 
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {/* ------------------ User Profile Responsive Mobile Device ------- */}
                    <ul tabIndex="0" className="menu menu-compact dropdown-content p-2 shadow-lg bg-gray-200 rounded-box w-52">
                        {menuItems}

                         {/*---- profileMenu and subProfileMenu Item  for Mobile ----*/}
                        <div className="dropdown dropdown-bottom  ">
                            <label tabIndex="1" className="flex justify-between items-end  m-1">{profileMenu}</label>
                            {
                                user &&  <>
                                    <ul tabIndex="0" className="dropdown-content menu rounded-box p-2 mt-2 ml-5 w-52 bg-gray-200">
                                        {subProfileMenu}
                                    </ul>
                                </>
                            }
                        </div>
                    </ul>
                </div>
                <Link className="text-xl">BFSA  </Link>
            </div>
            
            {/* --------------- User Profile Desktop Device ----------- */}
            <div className="navbar-end hidden lg:flex   ">
                <ul className="menu menu-horizontal  ">
                    {menuItems}
                    
                    {/*--- profileMenu and subProfileMenu Item  for desktop -----*/}
                    <div className="dropdown dropdown-end ">
                        <label tabIndex="0" className="flex justify-between items-end  m-1">{profileMenu}</label>
                        {
                            user &&  <>
                                <ul tabIndex="0" className="dropdown-content menu rounded-md p-2 mt-2 w-52 bg-gray-200">
                                    {subProfileMenu}
                                </ul>
                            </>
                        }
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