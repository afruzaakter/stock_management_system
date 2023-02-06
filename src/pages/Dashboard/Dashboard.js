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
import useAdmin from '../../hooks/useAdmin';
import useApprove from '../../hooks/useApprove';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(true);
  const [openReports, setOpenReports] = useState(0);
  const [openSettings, setOpenSettings] = useState(0);
  const [subReportOpen, setSubReportOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [librarySubMenuOpen, setLibrarySubMenuOpen] = useState(false);
  const [admin] = useAdmin(user);
  const [approve] = useApprove(user);


  if (loading) {
    return <Loading />
  }
  return (
      <div className="drawer drawer-mobile ">
        <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>

        <div className="drawer-side ">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-3 overflow-y-auto rounded-r-xl    text-base-content">
            <div>
              <div className={`bg-gray-200  h-full p-4 rounded-md duration-300   relative ${open ? "lg:w-64" : "w-20"}`}>
                <BsArrowRightShort className={`bg-white   absolute -right-3 top-9 border border-gray-900 cursor-pointer text-3xl rounded-full ${open && "rotate-180"} `} onClick={() => setOpen(!open)} />

                {/* ***************************** Dashboard menu  Start *********************************** */}
                <ul className='  animate__animated animate__fadeInLeft'>

                  {/* ---------- Dashboard  ---------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2  rounded-md `}><Link to='/dashboard' className='w-full font-medium border-b border-gray-400 rounded-md'>
                    <span className={`text-md text-gray-800  block  ${!open ? "text-md" : "ml-0"} `} >  <MdOutlineDashboardCustomize  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Dashboard</span></Link>
                  </li>

                  {/* -----------------------------Requisition dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md `}><Link to='/dashboard/requisition' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "" : "ml-0"} `} >  <AiFillDiff  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition</span></Link></li>
                  {/* -----------------------------Requisition dashboard menu End ---------------------------- */}
                  {/* -----------------------------Requisition dashboard Authorize menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md `}><Link to='/dashboard/requisitionAuthorize' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={`text-md text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <TbFileDatabase  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition(Authorize) </span></Link></li>
                  {/* -----------------------------Requisition Authorize dashboard menu End ---------------------------- */}

                  {/* -----------------------------Requisition Approval dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md`}><Link to='/dashboard/requisitionApproval' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <AiOutlineFieldTime  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition(Approval)</span></Link></li>
                  {/* -----------------------------Requisition Approval dashboard menu End ---------------------------- */}

                  {/* -----------------------------Requisition Issue dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md`}><Link to='/dashboard/requisitionIssue' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <GoIssueClosed  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Requisition(Issue) </span></Link></li>
                  {/* -----------------------------Requisition Issue dashboard menu End ---------------------------- */}

                  {/* -----------------------------Add Inventory dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md`}><Link to='/dashboard/addInventory' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdInventory  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Add Inventory</span></Link></li>
                  {/* -----------------------------Add Inventory dashboard menu End ---------------------------- */}
                  {/* -----------------------------Current Stock dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md flex items-start mt-2 rounded-md`}><Link to='/dashboard/currentStock' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <BiStore  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Current Stock </span></Link></li>
                  {/* -----------------------------Current Stock dashboard menu End ---------------------------- */}
                  {/* -----------------------------Stock Adjust  dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md`}><Link to='/dashboard/stockAdjust' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdOutlineDashboardCustomize  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Stock Adjust </span></Link></li>
                  {/* -----------------------------Stock Adjust dashboard menu End ---------------------------- */}

                  {/* ---------------------------Supplier dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md flex items-start mt-2 rounded-md`}><Link to='/dashboard/supplier' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <BsCartPlusFill  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Supplier </span></Link></li>
                  {/* -----------------------------Supplier dashboard menu End ---------------------------- */}

                  {/* ----------------------------Product dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md  flex items-start mt-2 rounded-md`}><Link to='/dashboard/product' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <MdProductionQuantityLimits  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Product </span></Link></li>
                  {/* -----------------------------Product dashboard menu End ---------------------------- */}


                  {/* ----------------------------Reports dashboard menu Start ---------------------------- */}
                  <li onClick={() =>{ setSubReportOpen(!subReportOpen); setOpenReports(!openReports) }} className={`text-gray-300 text-md  flex items-start rounded-md   mt-2   w-full font-medium border-b border-gray-400  `}>
                   <div className='flex justify-between'>
                    <span className={` text-gray-800  block ${!open ? "text-xl" : "ml-0"} `} >  <HiDocumentReport  /></span>
                    <span className={` text-gray-800 pr-20 ${!open && 'hidden'}`}>Reports </span> 
                    <span className={` text-gray-800 ${!open && 'hidden'} ${openReports && "rotate-180"}`}> <FaChevronDown /></span>
                   </div>
                  </li>
                    {
                      subReportOpen && <>
                       {/* ------------------------------ Product issue ----------------------- */}
                       <li className={`text-gray-300 text-md mt-2 flex items-start ml-5 rounded-md `}><Link to="/dashboard/reports/productIssue" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block ${!open ? "text-xl" : "ml-0"} `} >  <GoIssueReopened  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Product issue </span></Link></li>
                      {/* ------------------------------ Inventory  ----------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-5  rounded-md`}><Link to="/dashboard/reports/inventory" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block ${!open ? "text-xl" : "ml-0"} `} >  <MdOutlineInventory  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Inventory </span></Link></li>
                      {/* ------------------------------ Employee Report-------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-5 rounded-md `}><Link to="/dashboard/reports/employeeReport" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block ${!open ? "text-xl" : "ml-0"} `} >  <FaUserFriends  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Employee Report </span></Link></li>
                      {/* ------------------------------User Report-------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-5 rounded-md `}><Link to="/dashboard/reports/userReport" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block ${!open ? "text-xl" : "ml-0"} `} >  <FaUserFriends  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>User Report </span></Link></li>
                      {/* ------------------------------User Report-------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-5 rounded-md `}><Link to="/dashboard/reports/departmentDesignationReport" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block ${!open ? "text-xl" : "ml-0"} `} >  <FaUserFriends  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>DD Report </span></Link></li>
                      </>
                    }

                  {/* -----------------------------Reports dashboard menu End ---------------------------- */}


                  {/* ----------------------------Employee dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md mt-2 flex items-start rounded-md `}><Link to='/dashboard/employee' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-800  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <HiUserGroup  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>Employee </span></Link></li> 
                  {/* -----------------------Employee dashboard menu End ---------------------- */}

                  {/* ------------------------User Management  dashboard menu Start ---------------------------- */}
                  <li className={`text-gray-300 text-md mt-2 flex items-start rounded-md`}><Link to='/dashboard/userManagement' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-700  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <FaUsersCog  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>User Management </span></Link>
                  </li>
                  {/* ---------------------- All Users ---------------- */}
                  <li className={`text-gray-300 text-md mt-2 flex items-start rounded-md`}><Link to='/dashboard/allUsers' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                    <span className={` text-gray-700  block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <FaUsersCog  /></span>
                    <span className={` text-gray-800 ${!open && 'hidden'}`}>All Users </span></Link>
                  </li>
                  {/* -----------------------------User Management  dashboard menu End ---------------------- */}

                  {/* ----------------------------Settings dashboard Sub menu Start ---------------------------- */}
                  <li onClick={() => {setSubMenuOpen(!subMenuOpen); setOpenSettings(!openSettings)}} className={`text-gray-300 text-md  flex items-start rounded-md w-full mt-2 font-medium border-b border-gray-400   `}>
                    
                    <div className='flex justify-between'>
                    <span className={` text-gray-800 block ml-1  ${!open ? "text-xl" : "ml-0"} `} >  <AiFillSetting  /></span>
                    <span className={` text-gray-800 pr-20 ${!open && 'hidden'}`}>Settings </span> 
                    <span className={` text-gray-800 ${!open && 'hidden'} ${openSettings && "rotate-180"}`}> <FaChevronDown/></span>
                    </div>
                    
                    </li>
                  {
                    subMenuOpen && <ul>
                      {/* ------------------------------ Setting Department ----------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-4 rounded-md `}><Link to="/dashboard/department" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Department </span></Link></li>
                      {/* ------------------------------ Setting Designation ----------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-4  rounded-md `}><Link to="/dashboard/designation" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Designation </span></Link></li>
                      {/* ------------------------------ Setting Product Key ----------------------- */}
                      <li className={`text-gray-300 text-md mt-2 flex items-start ml-4  rounded-md`}><Link to="/dashboard/productKey" className='w-full font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Product Key </span></Link></li>

                      {/* ------------------------ Setting Library ------------------- */}
                      <li onClick={() => setLibrarySubMenuOpen(!librarySubMenuOpen)} className={`text-gray-300 text-md  flex items-start ml-4  rounded-md `}><Link className='w-full mt-2 font-medium border-b border-gray-400  rounded-md    '>
                        <span className={` text-gray-800  block   ${!open ? "text-xl" : "ml-0"} `} >  <MdLocalLibrary  /></span>
                        <span className={` text-gray-800 ${!open && 'hidden'}`}>Library </span></Link></li>
                      {
                        librarySubMenuOpen && <ul>
                          <li className={`text-gray-300 text-md mt-2 flex items-start ml-8 rounded-md`}><Link to='/dashboard/keyType' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                            <span className={` text-gray-800  block   ${!open ? "text-xl" : "ml-0"} `} >  <AiOutlineRightSquare  /></span>
                            <span className={` text-gray-800 ${!open && 'hidden'}`}>Key Type </span></Link></li>
                            {/* ---------------------- Submenu Budget code----------------- */}
                          <li className={`text-gray-300 text-md mt-2 flex items-start ml-8 rounded-md `}><Link to='/dashboard/budgetCode' className='w-full font-medium border-b border-gray-400  rounded-md    '>
                            <span className={` text-gray-800  block   ${!open ? "text-xl" : "ml-0"} `} >  <AiOutlineRightSquare  /></span>
                            <span className={` text-gray-800 ${!open && 'hidden'}`}>Budget Code </span></Link></li>

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