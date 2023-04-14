import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Setting from '../Setting';
import { toast } from 'react-toastify';

const Designation = () => {

    const [deleteID, setDeleteID] = useState('');
    //------ Designation Fetch method -----------------  
    const [designations, setDesignations] = useState([]);
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/designation')
            .then(res => res.json())
            .then(data => setDesignations(data))

    }, [])

    //--------- Designation Delete method------------
    const handleDelete = (id) => {
        const url = `https://stock-management-system-server.vercel.app/designation/${id}`
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                const remaining = designations.filter(designation => designation._id !== id)
                setDesignations(remaining);
                setDeleteID('');
                toast.success('Data was Deleted Successfully!');
            })

    }
    return (
        <div className='border  p-1 rounded-lg m-6'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='md:text-xl lg:text-3xl'> Employee Designation</h1>
                </div>

            </div>

            <div className='mb-2 flex justify-between '>
                <div>

                    <Link to="/dashboard/designationAdd" className='btn btn-sm mx-1 bg-green-700 text-white hover:bg-gray-600 '><FaPlus /> Add Designation</Link>


                </div>

            </div>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Description </th>
                            <th>Show Order  </th>
                            <th>Is System </th>
                            <th>Action </th>

                        </tr>
                    </thead>

                    <tbody>

                        {
                            designations.map((designation, index) =>
                                <tr key={designation._id}>
                                    <th>{index + 1}</th>
                                    <td>{designation.name}</td>
                                    <td>{designation.description}</td>
                                    <td>{designation.order}</td>
                                    <td>No</td>
                                    <td>
                                        <Link to={`/dashboard/designationEdit/${designation._id}`} className="btn btn-xs mx-1 bg-success text-white">
                                            <FiEdit /> </Link>
                                        <label htmlFor="my-modal-6" className="btn btn-xs bg-red-500 text-white"
                                            onClick={() => setDeleteID(designation._id)} >
                                            <AiOutlineDelete />
                                        </label>

                                        {/* -------- delete modal ----------------- */}
                                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                        <div className="modal modal-bottom justify-around sm:modal-middle ">
                                            <div className="bg-gray-300 p-5 rounded-md shadow-lg lg:max-w-52">
                                                <h3 className="font-bold text-lg text-center">Are you sure you want to delete it?</h3>

                                                <div className="mr-14 modal-action">
                                                    <label htmlFor="my-modal-6" onClick={() => handleDelete(deleteID)}
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

export default Designation;