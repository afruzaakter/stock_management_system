import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const Product = () => {
    return (
        <div className='border m-2 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Product List</h1>
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

            <div className='mb-2'>
                <button className="btn btn-sm mx-1 bg-primary text-white"> 
                <FaPlus/> Add Product</button>
                <button className="btn btn-sm mx-1 bg-success text-white">
                    <FiEdit /> Edit</button>
                <button className="btn btn-sm mx-1 bg-error text-white">
                    <AiOutlineDelete /> Delete</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Budget Code </th>
                            <th>Product Name</th>
                            <th>Unit</th>
                            <th>Stock </th>
                            <th>Alert Qty </th>
                            <th>Order </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr >
                            <th>02015</th>
                            <td>Book </td>
                            <td>Pice</td>
                            <td>  5000 </td>
                            <td>50</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Product;