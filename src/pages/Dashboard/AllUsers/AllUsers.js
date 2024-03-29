import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useQuery, QueryClientProvider, QueryClient } from 'react-query'
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import { toast } from 'react-toastify';

const queryClient = new QueryClient()
const AllUsers = () => {
    // API call using use Query
    // const { data: AllUsers, isLoading, refetch } = useQuery('AllUsers', () => fetch('https://stock-management-system-server.vercel.app/allUsers', {
    //     method: 'GET',
    //     headers: {
    //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    // }).then(res => res.json()))

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch("https://stock-management-system-server.vercel.app/user")
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    useEffect(() => {
        fetch("https://stock-management-system-server.vercel.app/user")
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    const { email, role } = allUsers;
    const makeAdmin = () => {
        const url = `https://stock-management-system-server.vercel.app/user/admin/${email}`
        fetch(url, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Successfully made an admin');
                console.log(data)
            })
    }
    const handleDelete = () => {

        const { email, role } = allUsers;
        const makeAdmin = () => {
            const url = `https://stock-management-system-server.vercel.app/user/admin/${email}`
            fetch(url, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Successfully made an admin');
                    console.log(data)
                })
        }
    }


    return (
        <div className='border m-2 pl-2 rounded-lg'>

            {/*------------AllUsers navbar-------- */}
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'>All Users Account: {allUsers.length} </h1>
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

            {/* AllUsers table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> SL No. </th>
                            <th> Name  </th>
                            <th> Email </th>
                            <th> Role Manage</th>
                            <th> Action </th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsers.map((user, index) =>
                                <tr key={user._id}>
                                    <td>{index + 1} </td>
                                    <td>{user.fullName} </td>
                                    <td>{user.email} </td>
                                    {/* <td>{user.userRole } </td>
                                <td> Yes </td>
                                <td> No </td> */}
                                    <td> {role !== 'admin' && <button className='btn btn-sm bg-red-500 text-white' onClick={makeAdmin}> Make Admin</button>} </td>
                                    <td className='flex gap-3'>
                                        <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/userEdit/${user._id}`}> <FiEdit /> </Link>
                                        <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(user._id)}> <AiOutlineDelete /></button>
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

export default AllUsers;