import React, { useEffect, useState } from 'react';
import Print from '../../../Shared/Print';
import { AiFillFilePdf } from 'react-icons/ai';
import { AiFillFileExcel } from 'react-icons/ai';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';

const EmployeeReport = () => {
    const ref = useRef()
    //------ Departments Fetch method -----------------  
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/department')
            .then(res => res.json())
            .then(data => setDepartments(data))
    }, [])
    //------ Designation Fetch method -----------------  
    const [designations, setDesignations] = useState([]);
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/designation')
            .then(res => res.json())
            .then(data => setDesignations(data))
    }, []);

    // all employee data show method-------------
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch("https://stock-management-system-server.vercel.app/employee")
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])


    // ------------ sort numbers show order --------------
    const employeeSort = [...employees].sort((a, b) => a.order - b.order);

    // setEmployees(employeeSorte);




    return (
        <div className='m-5'>
            <h1 className='text-xl font-bold'>Employee Report</h1>
            <div className='lg:flex lg:justify-start lg:gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>Department</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-96 focus:outline-0 rounded-sm  
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

                        className={`input input-sm   border border-green-700 mt-1 lg:w-96 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Designation</option>
                        {
                            designations.map((designation) => <option key={designation._id}>{designation.name}</option>)
                        }

                    </select>

                </div>
            </div>
            {/* <div className='lg:flex lg:justify-start lg:gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>Religion</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-500'>All Religion</option>
                        <option value=''>Islam </option>
                        <option value=''>Hindu </option>
                        <option value=''>Christian </option>
                        <option value=''>Buddha </option>

                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Gender</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Gender</option>
                        <option value=''>Male </option>
                        <option value=''>Female </option>
                        <option value=''>Other </option>

                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Blood Group</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-64 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Blood Group</option>
                        <option value=''>A+</option>
                        <option value=''>A- </option>
                        <option value=''>B+</option>
                        <option value=''>B-</option>
                        <option value=''>O+</option>
                        <option value=''>O-</option>
                        <option value=''>AB+</option>
                        <option value=''>AB-</option>                    
                    </select>

                </div>
            </div> */}

            <div className='lg:flex lg:justify-start lg:gap-14 lg:items-center mb-3'>
                {/* -----------------------Designation Name Field ------------------------------ */}
                <div className="form-control">
                    <label className='text-start'>Report Type</label>
                    <select
                        className={`input input-sm   border border-green-700 mt-1 lg:w-96 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value=''>Short</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>
                        <option value=''>On Date </option>
                        <option value=''>Date Between</option>
                        <option value=''>Invoice Between</option>

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
                {/* <Print /> */}
            </div>
            <div ref={ref}>
                {/*------------------ table ------------------- */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Employee_ID </th>
                                <th>Order</th>
                                <th>Name </th>
                                <th>Mobile  </th>
                                <th>Email  </th>
                                <th>Designation  </th>
                                <th> Department</th>
                                <th> Active </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                employeeSort.map((employee) =>
                                    <tr key={employee._id}>
                                        <td>{employee.employeeId} </td>
                                        <td>{employee.order} </td>
                                        <td>{employee.employeeName} </td>
                                        <td>{employee.mobileNo} </td>
                                        <td>{employee.email} </td>
                                        <td>{employee.designation} </td>
                                        <td>{employee.department} </td>
                                        <td>{employee.createUser} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeReport;