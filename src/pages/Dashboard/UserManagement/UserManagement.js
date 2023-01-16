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

const UserManagement = () => {
    const [users, setUsers]= useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/user")
        .then(res=>res.json())
        .then(data=> setUsers(data))
    },[])

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
                <Link to='/dashboard/addNewUser' className="btn btn-sm mx-1 bg-primary
                    text-white hover:bg-success hover:text-white">
                    <FaPlus/> Add</Link>
                <button className="btn btn-sm mx-1 bg-success text-white">
                    <FiEdit /> Edit</button>
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
                            <th>User Name  </th>
                            <th> Assign Role </th>
                            <th> Organization </th>
                            <th> Email </th>
                            <th> Active </th>
                            <th> Locked </th>
                            <th> Topic Sub </th>
                            <th> Action </th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user)=>
                            <tr key={user._id}>
                                <th>{user.fullName }</th>
                                <td>{user.userName }</td>
                                <td>{user.userRole }</td>
                                <td>{user.organization }</td>
                                <td>{user.email }</td>
                                <td>Yes </td>
                                <td> No </td>
                                <td> No </td>
                                <td>
                                    <Link>edit </Link>
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

export default UserManagement;