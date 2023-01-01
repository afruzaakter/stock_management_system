import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "./Loading";

const Navbar = ({ children }) => {
    const [ user, loading ] = useAuthState(auth)
    if(loading){
        return <Loading/>
    }
    const handleSignOut = () =>{
        signOut(auth);

    }
    const menuItem = <>
        <li> <NavLink to="/home" className="rounded-lg">Home</NavLink> </li>
        <li><NavLink to="/dashboard" className="rounded-lg">Dashboard </NavLink></li>

        {
        user? <button className="btn" onClick={handleSignOut} >Sign Out</button> :
        <li> <NavLink to="/login" className="rounded-lg"> Login </NavLink> </li> 
        }
    </>
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar --> */}
                <div className="w-full navbar bg-base-100 px-20">
                    <div className="flex-1 px-2 mx-2 text-2xl">Store Management</div>
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"> </path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal gap-8">
                      
                         {menuItem}
                        </ul>
                    </div>
                </div>
                {/* <!-- Page content here --> */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                   {menuItem}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;