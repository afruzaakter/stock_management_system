import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useQuery } from 'react-query';
import {useQuery , QueryClientProvider, QueryClient } from 'react-query'
import Loading from '../../Shared/Loading';

const queryClient = new QueryClient()
const AllUsers = () => {
    // API call using use Query
    // const { data: AllUsers, isLoading, refetch } = useQuery('AllUsers', () => fetch('http://localhost:5000/allUsers', {
    //     method: 'GET',
    //     headers: {
    //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    // }).then(res => res.json()))

    const [AllUsers, setAllUsers]= useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/allUsers")
        .then(res=>res.json())
        .then(data=> setAllUsers(data))
    },[])




    return (
        <div className='border m-2 pl-2 rounded-lg'>
            
            {/*------------AllUsers navbar-------- */}
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'>All Users Account: {AllUsers.length} </h1> 
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
                            <th> Action </th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {/* {
                            users.map((user)=>
                            <tr key={user._id}>
                                <th>{user.fullName } </th>
                                <td>{user.email} </td>
                                <td>{user.userName } </td>
                                <td>{user.organization} </td>
                                <td>{user.userRole } </td>
                                <td> Yes </td>
                                <td> No </td>
                                <td> No </td>
                                <td className='flex gap-3'>
                                    <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/userEdit/${user._id}`}> <FiEdit /> </Link>
                                    <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(user._id)}> <AiOutlineDelete /></button>
                                </td> 
                             </tr>
                            )
                        }
                    */}
                        
                    </tbody>
                </table>
            </div>





        </div>
    );
};

export default AllUsers;