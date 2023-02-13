import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Department = ({ department }) => {
    const [deleteID, setDeleteID] = useState('')
    const [updated, setUpdated] = useState(false);

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/department')
            .then(res => res.json())
            .then(data => setDepartments(data))

    }, [updated])
    // console.log(department)

    const handleDelete = (id) => {
        const url = `http://localhost:5000/department/${id}`
        console.log(url)
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const remaining = departments.filter(department => department._id !== id)
                setDepartments(remaining);
                setDeleteID('');
                toast.success('Data was Deleted Successfully!');
            })
    }

    return (
        <div className='border m-1 p-1 rounded-lg '>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Employee Department</h1>
                </div>

            </div>

            <div className='mb-2 flex justify-between '>
                <div>
                    <Link to="/dashboard/departmentAdd" className='btn btn-sm mx-1 bg-green-700 text-white hover:bg-gray-600 '><FaPlus /> Add Department</Link>
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
                            departments.map((department, index) =>
                                <tr key={department._id}>
                                    <th>{index + 1}</th>
                                    <td>{department.name}</td>
                                    <td>{department.description}</td>
                                    <td>{department.order}</td>
                                    <td>Yes</td>
                                    <td>
                                        <Link to={`/dashboard/departmentEdit/${department._id}`} className="btn btn-xs mx-1 bg-success text-white">
                                            <FiEdit /> </Link>

                                        <label htmlFor="my-modal-6" className="btn btn-xs bg-red-500 text-white"
                                            onClick={() => setDeleteID(department._id)} >
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

export default Department;