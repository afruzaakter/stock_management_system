import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Employee = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/employee")
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    // ------------ sort numbers show order --------------
    const employeeSort = [...employees].sort((a, b) => a.order - b.order);



    return (
        <div className='border m-2 pl-2 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Employee List </h1>
                </div>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ----------------- Add/Manage Btn ---------------- */}
            <div className='mb-2'>
                <Link to='/dashboard/addNewEmployee' className="btn btn-sm mx-1 bg-green-700
                    text-white hover:bg-primary hover:text-white">
                    <FaPlus /> Add New Employee
                </Link>
                <button className="btn btn-sm mx-1 bg-success text-white hover:bg-primary">
                    Manage
                </button>
            </div>

            {/*------------------ table ------------------- */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Employee_ID </th>
                            <th>Name </th>
                            <th>Mobile  </th>
                            <th>Email  </th>
                            <th>Order </th>
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
                                    <td>{employee.employeeName} </td>
                                    <td>{employee.mobileNo} </td>
                                    <td>{employee.email} </td>
                                    <td>{employee.order} </td>
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
    );
};
export default Employee;