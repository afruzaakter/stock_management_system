import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { MdBlock } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const UserManagement = () => {
    const [user, loading] = useAuthState(auth)
    const [users, setUsers] = useState([])
    const [deleteID, setDeleteID] = useState('')

    useEffect(() => {
        fetch("http://localhost:5000/user")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleDelete = (id) => {
        const url = `http://localhost:5000/user/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                toast.success('Data Deleted Successfully!');
                const remaining = users.filter(user => user._id !== id)
                setUsers(remaining);
                setDeleteID(' ');
                toast.success('Data was Deleted Successfully!');
            })
    }

    return (
        <div className='border m-2 pl-2 rounded-lg'>

            {/*------------ navbar-------- */}
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> User Account</h1>
                </div>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div>
                    <button className="btn  mx-1 bg-primary text-white">
                        <AiOutlinePlusCircle /> Role Feature </button>
                </div>
            </div>

            {/*------------ Button------ */}
            <div className='mb-2 '>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn m-1 btn-sm bg-primary
                         text-white "> <BsSearch /> Active <IoMdArrowDropdown />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow
                             bg-primary text-white rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                <Link to='/dashboard/addNewUser' className="btn btn-sm mx-1 bg-green-700  
                    text-white hover:bg-primary hover:text-white">
                    <FaPlus /> Add</Link>
                <button className="btn btn-sm mx-1 bg-primary text-white">
                    <MdDone /> Active </button>
                <button className="btn btn-sm mx-1 bg-error text-white">
                    < MdBlock /> Inactive </button>
                <button className="btn btn-sm mx-1 bg-info text-white">
                    < FiRefreshCcw />  Reset Password</button>
            </div>


            {/*------------ Table-------- */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> Full Name </th>
                            <th> Email </th>
                            <th>User Name  </th>
                            {/* <th> Organization </th> */}
                            <th> Assign Role </th>
                            {/* <th> Active </th>
                            <th> Locked </th>
                            <th> Topic Sub </th> */}
                            <th className='text-center'> Action </th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user) =>
                                <tr key={user._id}>
                                    <td>{user.fullName} </td>
                                    <td>{user.email} </td>
                                    <td>{user.userName} </td>
                                    {/* <td>{user.organization} </td> */}
                                    <td>{user.userRole} </td>
                                    {/* <td> Yes </td>
                                    <td> No </td>
                                    <td> No </td> */}
                                    <td className='flex gap-3'>
                                        <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/userEdit/${user._id}`}>
                                            {/* <FiEdit /> */}
                                            Assign_Role
                                        </Link>
                                      
                                        <label htmlFor="my-modal-6" className="btn btn-sm bg-red-500 text-white"
                                        onClick={() => setDeleteID(user._id)} >
                                        <AiOutlineDelete />
                                    </label>

                                    </td>

                                  

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
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;