import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { AiFillFilePdf } from 'react-icons/ai';
import { AiFillFileExcel } from 'react-icons/ai';
import { useRef } from 'react';

const UserReport = () => {
    const ref = useRef()
   
 //------ Departments Fetch method -----------------  
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/department')
            .then(res => res.json())
            .then(data => setDepartments(data))
    }, []);
    //------ Designation Fetch method -----------------  
    const [designations, setDesignations] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/designation')
            .then(res => res.json())
            .then(data => setDesignations(data))
    }, []);
    //------- All user Report----------
    const [allUsers, setAllUsers] = useState([])
    console.log(allUsers)
    useEffect(() => {
        fetch("http://localhost:5000/user")
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    return (
        <div className='m-5'>
            <h1 className='text-xl font-bold'>User Report</h1>
            <div className='lg:flex lg:justify-start lg:gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>Department</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                         focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-500'>All Department</option>
                        {
                            departments.map((department) => <option key={department._id}>{department.name}</option>)
                        }

                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Designation</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                         focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Designation</option>
                        {
                            designations.map((designation) => <option key={designation._id}>{designation.name}</option>)
                        }

                    </select>

                </div>
            </div>
            <div className='flex justify-start gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>User Role</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                         focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-500'>All Role</option>
                        <option value=''>Role_Inventory </option>
                        <option value=''>Role_Store</option>
                        <option value=''>Role_Approve </option>
                        <option value=''>Role_Authorization </option>
                        <option value=''>Role_Admin</option>
                        <option value=''>Role_User</option>
                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Role Condition Type</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                         focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>OR</option>
                        <option value=''>AND </option>
                    </select>
                </div>
                {/* //---------------- Pdf and print ---------- */}
                <div >
                    <p className='text-center mr-14 mb-2'>print</p>
                    <div className='flex justify-center gap-2 items-center '>

                        <ReactToPrint trigger={() => <button className='h-10 w-12  bg-pink-600 rounded-l-md hover:bg-black  group-hover:opacity-100 transition-all duration-300 '><AiFillFilePdf className=' text-xl text-white ml-4' />
                        </button>} content={() => ref.current} />
                        <button className='border absolute  bg-white border-gray-600 rounded-full h-7 flex items-center p-1  w-7'>or</button>
                        <button className='h-10 w-12  bg-blue-600 rounded-r-md'><AiFillFileExcel className=' text-xl text-white ml-4' /></button>
                    </div>
                </div>
            </div>
            {/* AllUsers table */}
            <div ref={ref} className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <td> SL No. </td>
                            <td> Name  </td>
                            <td> Email </td>


                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsers.map((user, index) =>
                                <tr key={user._id}>
                                    <td>{index + 1} </td>
                                    <td>{user.fullName} </td>
                                    <td>{user.email} </td>


                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserReport;