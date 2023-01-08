import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbMessageReport } from 'react-icons/tb';
import AddInventoryModal from './AddInventoryModal';
import { toast } from 'react-toastify';

const AddInventory = () => {
    const[addInventorys, setAddInventorys] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [rowId, setRowId] = useState('');
    const [checkboxClicked, setCheckboxClicked] = useState(false);

    // console.log( "Row Id", rowId);
    // console.log("Clicked", checkboxClicked);

    useEffect(() =>{
        fetch('http://localhost:5000/addInventory')
        .then(res => res.json())
        .then(data => setAddInventorys(data))
        
    },[updated])

    const handleDelete = (id) =>{
        if (checkboxClicked === true) {
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

        }else{
            toast("Please, Select Any Row")
        }
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

                <button className="btn btn-sm mx-1 bg-success text-white">
                    <FiEdit /> Edit</button>
                <button onClick={()=> handleDelete(rowId)} className="btn btn-sm mx-1 bg-error
                 text-white"> <AiOutlineDelete /> Delete</button>
                <button className="btn btn-sm mx-1 bg-warning   text-white">
                    <TbMessageReport /> Reports</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>    </th>
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
                        {
                            addInventorys.map((addInventory,index)=>
                            <tr className='bg-blue-900' key={addInventory._id}  onClick={() => setRowId(addInventory._id)}  >
                                <th onClick={()=> setCheckboxClicked(!checkboxClicked)}> 
                                    <label> <input type="checkbox" className="checkbox" /> </label>
                                </th>
                                <th> {index+1 } </th>
                                <th> { addInventory.purchase } </th>
                                <th> { addInventory.supplierName } </th>
                                <th> { addInventory.mobile } </th>
                                <th> { addInventory.acceptedNote } </th>
                                <th> { addInventory.createdNumber } </th>
                                <th> { addInventory.lastUpdateDate } </th>                                
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