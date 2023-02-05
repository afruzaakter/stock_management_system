import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Print from '../../../Shared/Print';

const UserReport = () => {
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
            <Print />
        </div>
    </div>
    );
};

export default UserReport;