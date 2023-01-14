import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Product = () => {
    // ---------- Drop down budgetCodes get method ----------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    // ---------- Delete method-----
    const handleDelete = (id) =>{
        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            const url = `http://localhost:5000/product/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = products.filter(product => product._id !== id)
                    setProducts(remaining);
                })

        }
    }
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
                <Link to='/dashboard/productAdd' className="btn btn-sm mx-1 bg-primary text-white">
                    <FaPlus /> Add Product</Link>
               
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Budget Code </th>
                            <th>Product Name</th>
                            <th>Unit</th>
                            <th>Stock </th>
                            <th>Alert Qty </th>
                            <th>Order </th>
                            <th>Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            products.slice(0).reverse().map((product, index) => <tr>
                                <th>{index+1}</th>
                                <td>{product.budgetCode} </td>
                                <td>{product.brandName} </td>
                                <td>{product.size}</td>
                                <td>{product.measureUnit} </td>
                                <td>{product.alertQty}</td>
                                <td>{product.sortOrder}</td>
                                <td className='flex gap-1'>
                                        <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/productEdit/${product._id}`}><FaEdit /></Link>
                                        <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(product._id)}><MdDeleteForever /></button>
                                    </td>
                            </tr>)
                        }
                        {/* <tr >
                            <th>02015</th>
                            <td>Book </td>
                            <td>Pice</td>
                            <td>  5000 </td>
                            <td>50</td>
                            <td>100</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Product;