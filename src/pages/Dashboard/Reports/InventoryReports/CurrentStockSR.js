import React from 'react';
import Print from '../../../Shared/Print';

const CurrentStockSR = () => {
    return (
        <div className='m-5'>
        <h1 className='text-xl font-bold'>Current Stock Summary Report</h1>
       
        <div className='flex justify-start gap-14 items-center mt-4'>
              {/* -----------------------Designation Name Field ------------------------------ */}
              <div className="form-control">
                        <label className='text-start'>Inventory Report By</label>
                        <select   
                            className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                             focus:border-blue-500 login-container-input `}>
                            <option value=''>All Product</option>
                            <option value=''>Budget Code</option>
                           
                  
                        </select>
                     
                    </div>   
         <Print/>
        </div>
    </div>
    );
};

export default CurrentStockSR;