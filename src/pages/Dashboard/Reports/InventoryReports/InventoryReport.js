import React from 'react';
import Print from '../../../Shared/Print';

const InventoryReport = () => {
    return (
        <div className='m-5'>
        <h1 className='text-xl font-bold'>Date Range wise inventory report</h1>
       
        <div className='flex justify-start gap-14 items-center mt-4'>
              {/* -----------------------Designation Name Field ------------------------------ */}
              <div className="form-control">
                        <label className='text-start'>Criteria</label>
                        <select   
                            className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                            <option value=''>All</option>
                            <option value=''>This Week </option>
                            <option value=''>This Month </option>
                            <option value=''>This Year </option>
                  
                        </select>
                     
                    </div>   
              {/* -----------------------Designation Name Field ------------------------------ */}
              <div className="form-control">
                        <label className='text-start'>Date</label>
                        <select   
                            className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                            <option value=''>Today</option>
                            <option value=''>This Week </option>
                            <option value=''>This Month </option>
                            <option value=''>This Year </option>
                            <option value=''>Date Between </option>
                  
                        </select>
                     
                    </div>   
         <Print/>
        </div>
    </div>
    );
};

export default InventoryReport;