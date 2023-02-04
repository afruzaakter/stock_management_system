import React from 'react';
import Print from '../../../Shared/Print';

const EmployeeReport = () => {
    return (
        <div className='m-5'>
            <h1 className='text-xl font-bold'>Employee Report</h1>
            <div className='lg:flex lg:justify-start lg:gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>Department</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-500'>All Department</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>

                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Designation</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Designation</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>

                    </select>

                </div>
            </div>
            <div className='lg:flex lg:justify-start lg:gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>Religion</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-500'>All Religion</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>

                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Gender</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Gender</option>
                        <option value=''>Male </option>
                        <option value=''>Female </option>
                        <option value=''>Others </option>

                    </select>

                </div>
                <div className="form-control">
                    <label className='text-start'>Blood Group</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-400'>All Designation</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>

                    </select>

                </div>
            </div>

            <div className='lg:flex lg:justify-start lg:gap-14 lg:items-center mb-3'>
                {/* -----------------------Designation Name Field ------------------------------ */}
                <div className="form-control">
                    <label className='text-start'>Report Type</label>
                    <select
                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value=''>Short</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>

                    </select>

                </div>
                <Print />
            </div>
        </div>
    );
};

export default EmployeeReport;