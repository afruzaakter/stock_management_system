import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { TbMessageReport } from 'react-icons/tb';
import { FiRefreshCcw } from 'react-icons/fi';
import { MdRefresh } from 'react-icons/md';

const CurrentStock = () => {
    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Current Stock</h1>
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

            <div className='mb-2 flex justify-between'>
                <div>
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-1 btn-sm bg-primary
                         text-white "> <BsSearch /> All Item <IoMdArrowDropdown />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow
                             bg-primary text-white rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-sm mx-1 bg-warning   text-white">
                        <TbMessageReport /> Reports</button>
                </div>
                <div>
                    <button className="btn btn-sm mx-1 bg-info text-white">
                        < FiRefreshCcw />  Reset</button>
                    <button className="btn btn-sm mx-1 bg-primary text-white">
                        < MdRefresh /> Refresh</button>
                </div>
            </div>

            {/* <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Code </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1001 </th>
                            <td>Laptop</td>
                            <td>Qnty </td>
                            <td> 46</td>
                            <td>84999.00</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            
                            <th>Code </th>
                            <th>Product Name </th>
                            <th>Unit </th>
                            <th>Stock </th>
                            <th>Sale Price </th>
                            <th>Alert Qty </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <th>
                                <label> <input type="checkbox" className="checkbox" /> </label>
                            </th>

                            <th>1001 </th>
                            <td>Laptop</td>
                            <td>Qnty </td>
                            <td> 46</td>
                            <td>84999.00</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>
            </div>







        </div>
    );
};

export default CurrentStock;