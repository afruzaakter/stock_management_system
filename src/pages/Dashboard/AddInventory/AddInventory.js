import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbMessageReport } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';

const AddInventory = () => {
    const [addInventories, setAddInventories] = useState([]);
    const [deleteID, setDeleteID] = useState('');
    const navigate=useNavigate();
    
    useEffect(() => {
        fetch('https://stockmanagementsystemserver-production.up.railway.app/addInventory',{
            method:'GET',
            headers:{
                'authorization':`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
               console.log('res', res);
               if(res.status===401 || res.status===403){
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                    navigate('/')
               }
                return res.json()
            })
            .then(data => setAddInventories(data))

    }, [])

    const handleDelete = (id) => {        
        const url = `https://stockmanagementsystemserver-production.up.railway.app/addInventory/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const remaining = addInventories.filter(addInventory => addInventory._id !== id)
                setAddInventories(remaining);
                setDeleteID('');
                toast.success('Data was Deleted Successfully!');
            })
    }


    return (
        <div className='border m-2 p-2 rounded-lg '>

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

            {/* ----------------- Add/Report Btn ---------------- */}
            <div className='mb-2 '>
                <Link to='/dashboard/addNewInventory' className="btn btn-sm mx-1 bg-green-700
                    text-white hover:bg-primary hover:text-white">
                    <FaPlus /> Add
                </Link>
                {/* <button> <AddInventoryModal setUpdated={setUpdated} />  </button> */}
                <button className="btn btn-sm mx-1 bg-warning   text-white">
                    <TbMessageReport /> Reports</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Product Name</th>
                            <th>Supplier Name</th>
                            <th>Purchase Notes </th>
                            <th>Product Code </th>
                            <th>UoM </th>
                            <th>Pack Size</th>
                            <th>Qnty</th>
                            <th>Total Qnty</th>
                            <th className='text-center '>Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            addInventories.map((addInventory, index) =>
                                <tr className='bg-blue-900' key={addInventory._id} >
                                    <th> {index + 1} </th>
                                    <td> {addInventory.productName} </td>
                                    <td> {addInventory.supplierCompany} </td>
                                    <td> {addInventory.purchase} </td>
                                    <td> {addInventory.autoCode} </td>
                                    <td> {addInventory.unitMeasurement} </td>
                                    <td> {addInventory.packSize} </td>
                                    <td> {addInventory.quantity} </td>
                                    <td> {addInventory.totalQuantity} </td>
                                    <td className='flex gap-3'>
                                        <Link className='btn btn-xs bg-green-500 text-white' to={`/dashboard/EditAddInventory/${addInventory._id}`}> <FiEdit /> </Link>

                                        <label htmlFor="my-modal-6" className="btn btn-xs bg-red-500 text-white"
                                            onClick={() =>setDeleteID(addInventory._id) } >
                                            <AiOutlineDelete />
                                        </label>
                                        {/* -------- delete modal ----------------- */}
                                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                        <div className="modal modal-bottom justify-around sm:modal-middle ">
                                            <div className="bg-gray-300 p-5 rounded-md shadow-lg lg:max-w-52">
                                                <h3 className="font-bold text-lg text-center">Are you sure you want to delete it?</h3>

                                                <div className="mr-14 modal-action">
                                                    <label htmlFor="my-modal-6" onClick={() =>handleDelete(deleteID)}
                                                        className="btn  btn-sm bg-green-600 text-white rounded-md">ok</label>
                                                    <label htmlFor="my-modal-6" className="btn btn-sm bg-red-600 rounded-md justify-start text-white">Cancel</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* -------- delete modal ----------------- */}

                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddInventory;