import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Requisition = () => {
    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Requisition Request List</h1>
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
                <Link to="/dashboard/requisitionCreate" className="btn btn-sm mx-1 bg-primary text-white">
                    <FaPlus /> New Requisition Request</Link>
                <button className="btn btn-sm mx-1 bg-success text-white">
                    <AiOutlineEye/> Preview </button>
            </div>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> #Requisition </th>
                            <th> Requested By </th>
                            <th> Request Status </th>
                            <th> Note </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr >
                            <td> 03-01-2023 </td>
                            <td>PO-0001</td>
                            <td>Razu Molla</td>
                            <td>  ok </td>
                            <td> Yes  </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Requisition;