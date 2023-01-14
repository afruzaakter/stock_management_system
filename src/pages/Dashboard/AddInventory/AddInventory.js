import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbMessageReport } from 'react-icons/tb';
import AddInventoryModal from './AddInventoryModal';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddInventory = () => {
    const[addInventorys, setAddInventorys] = useState([]);
    const [updated, setUpdated] = useState(false);
    // const [rowId, setRowId] = useState('');
    // const [checkboxClicked, setCheckboxClicked] = useState(false);

    useEffect(() =>{
        fetch('http://localhost:5000/addInventory')
        .then(res => res.json())
        .then(data => setAddInventorys(data))
        
    },[updated])

    const handleDelete = (id) =>{
        const url = `http://localhost:5000/addInventory/${id}`
        fetch(url, {
            method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const remaining = addInventorys.filter(department => department._id !== id)
                setAddInventorys(remaining);
        })
    }

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
                <button> <AddInventoryModal setUpdated={setUpdated} />  </button>
                <button className="btn btn-sm mx-1 bg-warning   text-white">
                    <TbMessageReport /> Reports</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>#Purchase</th>
                            <th>Supplier</th>
                            <th>Mobile </th>
                            <th>Accepted Note </th>
                            <th>Created </th>
                            <th>Last Update </th>
                            <th className='text-center '>Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            addInventorys.map((addInventory,index)=>
                            <tr className='bg-blue-900' key={addInventory._id} >
                                <th> {index+1 } </th>
                                <td> { addInventory.purchase } </td>
                                <td> { addInventory.supplierName } </td>
                                <td> { addInventory.mobile } </td>
                                <td> { addInventory.acceptedNote } </td>
                                <td> { addInventory.createdNumber } </td>
                                <td> { addInventory.lastUpdateDate } </td>                                
                                <td className='flex gap-3'>
                                <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/EditAddInventory/${addInventory._id}`}> <FiEdit /> </Link>
                                        <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(addInventory._id)}> <AiOutlineDelete /></button>
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