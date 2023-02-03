import React from 'react';
import Print from '../../../Shared/Print';

const DepartmentDesignationReport = () => {
    return (
        <div className='m-5'>
            <h1 className='text-xl font-bold'>Department/Designation Report</h1>
            <div className='lg:flex lg:justify-start lg:gap-8 mb-3'>
                <div className="form-control">
                    <label className='text-start'>Report Type</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 lg:w-80 focus:outline-0 rounded-sm  
                         focus:border-blue-500 login-container-input `}>
                        <option value='' className='text-gray-500'>Department</option>
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

export default DepartmentDesignationReport;