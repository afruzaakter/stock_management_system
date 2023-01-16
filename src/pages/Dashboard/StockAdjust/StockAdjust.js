import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbMessageReport } from 'react-icons/tb';
import { FiRefreshCcw } from 'react-icons/fi';
import { MdRefresh } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const StockAdjust = () => {
     // ---------- Drop down budgetCodes get method ----------
     const [products, setProducts] = useState([]);
     useEffect(() => {
         fetch('http://localhost:5000/product')
             .then(res => res.json())
             .then(data => setProducts(data))
     }, [])

     const handleDelete = (data) =>{

     }
    
    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'>Stock Adjust</h1>
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
                    <button className="btn btn-sm mx-1 bg-primary text-white">
                        <AiOutlineShoppingCart /> Adjust Stoke</button>
                    <button className="btn btn-sm mx-1 bg-error text-white">
                        <AiOutlineDelete /> Delete</button>
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

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Entry Type </th>
                            <th>Date </th>
                            <th>#Adjust </th>
                            <th> Adjust Amount</th>
                            <th> Adjust Note </th>

                        </tr>
                    </thead>

                    <tbody>
                    {
                            products.slice(0).reverse().map((product, index) => <tr key={product._id}>
                                <th>{index+1}</th>
                                <td>{product.budgetCode} </td>
                                <td>{product.brandName} </td>
                                <td>{product.size}</td>
                                <td>{product.stockOrder} </td>
                                <td>{product.alertQty}</td>
                                <td>{product.sortOrder}</td>
                                <td className='flex gap-1'>
                                        <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/productEdit/${product._id}`}><FaEdit /></Link>
                                        <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(product._id)}><MdDeleteForever /></button>
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default StockAdjust;