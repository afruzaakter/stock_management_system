import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
// import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Supplier = () => {
      // ---------- Drop down budgetCodes get method ----------
      const [suppliers, setSuppliers] = useState([]);
      useEffect(() => {
          fetch('http://localhost:5000/supplier')
              .then(res => res.json())
              .then(data => setSuppliers(data))
      }, []);
      //-------- supplier delete method -----------
      const handleDelete = (id) =>{
        console.log(id)
        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            const url = `http://localhost:5000/supplier/${id}`
            console.log(url)
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = suppliers.filter(supplier => supplier._id !== id)
                    setSuppliers(remaining);
                })

        }
      }
    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'>Supplier </h1>
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
                <Link to='/dashboard/createSupplier' className="btn btn-sm mx-1 bg-primary text-white">
                    <FaPlus /> Add New Supplier</Link>
                {/* <button className="btn btn-sm mx-1 bg-success text-white">
                    <FiEdit /> Edit Supplier</button>
                <button className="btn btn-sm mx-1 bg-error text-white">
                    <AiOutlineDelete /> Delete Supplier</button> */}
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> SL. </th>
                            <th> Name </th>
                            <th> Contact Person </th>
                            <th> Contact No. </th>
                            <th> Supplier-Id</th>
                            <th> Address </th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            suppliers.map((supplier,index) =><tr key={supplier._id}>
                                <th>{index+1}</th>
                                <td> {supplier.supplierCompany} </td>
                                <td>{supplier.contactPerson}</td>
                                <td>{supplier.contactNumber} </td>
                                <td> {supplier.autoCode}</td>
                                <td>{supplier.address} </td>
                                <td>
                                <Link className='btn btn-xs bg-green-500 text-white' to={`/dashboard/supplierEdit/${supplier._id}`}><FaEdit /></Link>
                                        <button className='btn btn-xs bg-red-500 text-white' onClick={() => handleDelete(supplier._id)}><AiOutlineDelete /></button>
                                </td>
                            </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Supplier;