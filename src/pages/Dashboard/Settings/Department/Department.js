import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { BiRefresh } from 'react-icons/bi';
import DepartmentAddModal from './DepartmentAddModal';
import { Link } from 'react-router-dom';


const Department = ({ department }) => {
    const [departments, setDepartments] = useState([]);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/department')
            .then(res => res.json())
            .then(data => setDepartments(data))

    }, [updated])
    // console.log(department)

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            const url = `http://localhost:5000/department/${id}`
            console.log(url)
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = departments.filter(department => department._id !== id)
                    setDepartments(remaining);
                })

        }
    }

    return (
        <div className='border m-1 p-1 rounded-lg m-6'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Employee Department</h1>
                </div>

            </div>

            <div className='mb-2 flex justify-between '>
                <div>

                    <button>
                        <DepartmentAddModal
                        > </DepartmentAddModal>
                    </button>

                    {/* <label 
                   
                    for="my-modal-6" className="btn btn-sm mx-1 bg-green-700 text-white"><FaPlus />  Add</label> */}

                    {/* <button className="btn btn-sm mx-1 bg-success text-white">
                    <FiEdit /> Edit</button> */}

                    {/* <button onClick={()=> handleDelete(department._id)} className="btn btn-sm mx-1 bg-blue-700 text-white">
                    <AiOutlineDelete /> Delete</button> */}
                </div>
                {/* <div >
                <button className="btn btn-sm mx-1 bg-gray-600   text-white">
                    <BiRefresh className='text-xl ' /> Reset</button>
                <button className="btn btn-sm mx-1 bg-blue-700   text-white">
                    <IoMdRefresh /> Refresh</button>
                </div> */}
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
                                        <button className="btn btn-sm mx-1 bg-red-500 text-white" onClick={() => handleDelete(department._id)}><AiOutlineDelete /> </button>
                                        <Link to={`/dashboard/departmentEdit/${department._id}`} className="btn btn-sm mx-1 bg-success text-white">
                                            <FiEdit /> </Link>
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