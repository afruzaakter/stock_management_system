import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbMessageReport } from 'react-icons/tb';

const AddInventory = () => {
    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Inventory List</h1>
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

            <div className='mb-2 '>
                <button className="btn btn-sm mx-1 bg-primary text-white">
                    <FaPlus /> Add Inventory</button>
                <button className="btn btn-sm mx-1 bg-success text-white">
                    <FiEdit /> Edit</button>
                <button className="btn btn-sm mx-1 bg-error text-white">
                    <AiOutlineDelete /> Delete</button>
                <button className="btn btn-sm mx-1 bg-warning   text-white">
                    <TbMessageReport /> Reports</button>
            </div>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>#Purchase</th>
                            <th>Supplier</th>
                            <th>Mobile </th>
                            <th>Accepted Note </th>
                            <th>Created </th>
                            <th>Last Update </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr >
                            <th>02-01-2023</th>
                            <td>PO-0001</td>
                            <td>Razu Molla</td>
                            <td>  01754247854 </td>
                            <td>A4 Paper</td>
                            <td>01754358895</td>
                            <td> 01-01-2023 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddInventory;