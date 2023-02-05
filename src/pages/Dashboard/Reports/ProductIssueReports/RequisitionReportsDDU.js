import React from 'react';
import Print from '../../../Shared/Print';

const RequisitionReportsDDU = () => {
    return (
        <div className='m-5'>
            <h1 className='text-xl font-bold'>Requisition report by Department/Designation/User</h1>
            <div className='mt-3 flex justify-start gap-14'>
                <div className="form-control">
                    <label className='text-start'>Requisition Status</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value=''>Pending </option>
                        <option value=''>Authorized </option>
                        <option value=''>Approved </option>
                        <option value=''>Rejected </option>

                    </select>


                </div>
                <div className="form-control">
                    <label className='text-start'>Requisition Report By</label>
                    <select

                        className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value=''>All </option>
                        <option value=''>Department</option>
                        <option value=''>Designation</option>
                        <option value=''>User</option>

                    </select>


                </div>
            </div>
            <div className='flex justify-start gap-14 items-center mt-4'>
                {/* -----------------------Designation Name Field ------------------------------ */}
                <div className="form-control">
                    <label className='text-start'>Filter By</label>
                    <select
                        className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                        <option value=''>Today</option>
                        <option value=''>This Week </option>
                        <option value=''>This Month </option>
                        <option value=''>This Year </option>
                        <option value=''>On Date </option>
                        <option value=''>Date Between</option>                   
                    </select>

                </div>
                <Print />
            </div>
        </div>
    );
};

export default RequisitionReportsDDU;