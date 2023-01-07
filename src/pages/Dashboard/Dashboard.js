import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { BsArrowRightShort } from 'react-icons/bs';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { GoIssueClosed } from 'react-icons/go';
import { AiFillSetting } from 'react-icons/ai';
import { HiDocumentReport } from 'react-icons/hi';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FaUsersCog } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { BsCartPlusFill } from 'react-icons/bs';
import { AiFillDiff } from 'react-icons/ai';
import { MdInventory } from 'react-icons/md';
import { BiStore } from 'react-icons/bi';
import { TbFileDatabase } from 'react-icons/tb';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { MdLocalLibrary } from 'react-icons/md';
import { AiOutlineRightSquare } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { GoIssueReopened } from 'react-icons/go';
import { MdOutlineInventory } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(true);
  const [subReportOpen, setSubReportOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [librarySubMenuOpen, setLibrarySubMenuOpen] = useState(false);


  if (loading) {
    return <Loading />
  }
  return (
      <div className="drawer drawer-mobile ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>

        <div className="drawer-side ">
          <label for="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto rounded-r-xl    text-base-content">
            <div>
              <div className={`bg-gray-200  h-full p-5 rounded-md duration-300   relative ${open ? "w-69" : "w-20"}`}>
                <BsArrowRightShort className={`bg-white   absolute -right-3 top-9 border border-gray-900 cursor-pointer text-3xl rounded-full ${!open && "rotate-180"} `} onClick={() => setOpen(!open)} />

                {/* ***************************** Dashboard menu  Start *********************************** */}
                <ul className='pt-8 animate__animated animate__fadeInLeft'>

                  {/* ***************************** Dashboard menu   *********************************** */}

                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard' className='w-full font-medium border-b border-gray-400 rounded-md  hover:bg-rose-400  '>

                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdOutlineDashboardCustomize className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Dashboard</span></Link></li>

                  {/* ***************************** Dashboard menu  Start *********************************** */}

                  {/* -----------------------------Requisition dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/requisition' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <AiFillDiff className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition</span></Link></li>
                  {/* -----------------------------Requisition dashboard menu End ---------------------------- */}
                  {/* -----------------------------Requisition dashboard Authorize menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/requisitionAuthorize' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <TbFileDatabase className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition (Authorize) </span></Link></li>
                  {/* -----------------------------Requisition Authorize dashboard menu End ---------------------------- */}

                  {/* -----------------------------Requisition Approval dashboard menu Start ---------------------------- */}
                  <li className={` text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/requisitionApproval' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <AiOutlineFieldTime className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition(Approval)</span></Link></li>
                  {/* -----------------------------Requisition Approval dashboard menu End ---------------------------- */}

                  {/* -----------------------------Requisition Issue dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/requisitionIssue' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <GoIssueClosed className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition(Issue) </span></Link></li>
                  {/* -----------------------------Requisition Issue dashboard menu End ---------------------------- */}

                  {/* -----------------------------Add Inventory dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/addInventory' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdInventory className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Add Inventory</span></Link></li>
                  {/* -----------------------------Add Inventory dashboard menu End ---------------------------- */}
                  {/* -----------------------------Current Stock dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/currentStock' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <BiStore className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Current Stock </span></Link></li>
                  {/* -----------------------------Current Stock dashboard menu End ---------------------------- */}
                  {/* -----------------------------Stock Adjust  dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/stockAdjust' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdOutlineDashboardCustomize className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Stock Adjust </span></Link></li>
                  {/* -----------------------------Stock Adjust dashboard menu End ---------------------------- */}

                  {/* ---------------------------Supplier dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/supplier' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <BsCartPlusFill className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Supplier </span></Link></li>
                  {/* -----------------------------Supplier dashboard menu End ---------------------------- */}

                  {/* ----------------------------Product dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/product' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdProductionQuantityLimits className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Product </span></Link></li>
                  {/* -----------------------------Product dashboard menu End ---------------------------- */}


                  {/* ----------------------------Reports dashboard menu Start ---------------------------- */}
                  <li onClick={() => setSubReportOpen(!subReportOpen)} className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <HiDocumentReport className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Reports </span> 
                    <span className={` text-gray-800 pl-20 ${!open && 'hidden'}`}> <FaChevronDown/></span>
                     </Link></li>
                    {
                      subReportOpen && <>
                       {/* ------------------------------ Product issue ----------------------- */}
                       <li className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to="/dashboard/reports/productIssue" className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <GoIssueReopened className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Product issue </span></Link></li>
                      {/* ------------------------------ Inventory  ----------------------- */}
                      <li className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to="/dashboard/reports/inventory" className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <MdOutlineInventory className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Inventory </span></Link></li>
                      {/* ------------------------------ Employee User -------------------- */}
                      <li className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to="/dashboard/reports/employeeUser" className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <FaUserFriends className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Employee User </span></Link></li>
                      </>
                    }







                  {/* -----------------------------Reports dashboard menu End ---------------------------- */}

                  {/* ----------------------------Employee dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/employee' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <HiUserGroup className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Employee </span></Link></li>
                  {/* -----------------------------Employee dashboard menu End ---------------------------- */}

                  {/* ------------------------User Management  dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/userManagement' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <FaUsersCog className='' /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>User Management </span></Link></li>
                  {/* -----------------------------User Management  dashboard menu End ---------------------- */}

                  {/* ----------------------------Settings dashboard Sub menu Start ---------------------------- */}
                  <li onClick={() => setSubMenuOpen(!subMenuOpen)} className={`text-gray-300 text-md  flex items-start   hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                    <span className={`text-xl text-gray-800 hover:text-gray-700 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <AiFillSetting className='' /></span>
                    <span className={` text-gray-800 pr-2 ${!open && 'hidden'}`}>Settings </span> 
                    <span className={` text-gray-800 pl-16 ${!open && 'hidden'}`}> <FaChevronDown/></span>
                    </Link></li>
                  {
                    subMenuOpen && <ul>
                      {/* ------------------------------ Setting Department ----------------------- */}
                      <li className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to="/dashboard/department" className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Department </span></Link></li>
                      {/* ------------------------------ Setting Designation ----------------------- */}
                      <li className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to="/dashboard/designation" className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Designation </span></Link></li>
                     {/* ------------------------------ Setting Product Key ----------------------- */}
                      <li className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to="/dashboard/productKey" className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Product Key </span></Link></li>

                      {/* ------------------------ Setting Library ------------------- */}
                      <li onClick={() => setLibrarySubMenuOpen(!librarySubMenuOpen)} className={`text-gray-300 text-md  flex items-start ml-4  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary className='' /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Library </span></Link></li>
                      {
                        librarySubMenuOpen && <ul>
                          <li className={`text-gray-300 text-md  flex items-start ml-8  hover:bg-rose-400 hover:text-rose-300  text-xl  rounded-md mt-2  `}><Link to='/dashboard/keyType' className='w-full font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                            <span className={`text-xl text-gray-800 hover:text-gray-700 block   ${!open ? "text-xl" : "ml-0"} `} >  <AiOutlineRightSquare className='' /></span>
                            <span className={` text-gray-800 ${!open && 'hidden'}`}>Key Type </span></Link></li>

                        </ul>
                      }
                    </ul>

                  }

                  {/* -----------------------------Settings dashboard  Sub menu End ---------------------------- */}



                </ul>
                {/* ***************************** Dashboard menu  Start *********************************** */}

              </div>

            </div>

          </ul>

        </div>

      </div>
  );
};

export default Dashboard;