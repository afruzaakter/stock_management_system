import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const PreviewRequisition = () => {
    const [requisitions, setRequisitions] = useState([]);
    console.log(requisitions)
    useEffect(() => {
        fetch('http://localhost:5000/createRequisition')
            .then(res => res.json())
            .then(data => setRequisitions(data))
    }, [])
    return (
        <div className='m-4 '>
            <h2 className='text-2xl font-bold ml-4'>R00071 || Requisition {requisitions.length} Date:{requisitions.date}</h2>
            <div className='flex justify-between items-center border-b-2 rounded-l-md p-5'>
                <div className='flex justify-start items-center gap-5 mt-4'>
                    <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                    <div>
                        <p className='text-blue-600'>Requisition Created</p>
                        <p>29/01/2023</p>
                    </div>
                </div>
                <div >
                    <Link to={`/dashboard`} className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600">
                        <FiEdit />Edit</Link>
                    <button className="btn btn-xs rounded-md  text-red-600 mx-1 border-red-600">❌ Delete</button>
                </div>
            </div>
            <div>
                <div className='flex justify-between mt-5'>
                    <h2 className='text-md ml-4  '>Requisition No. R00071 </h2>
                    <h2 className='text-md ml-4 '>Requisition Date: {requisitions.date}</h2>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th> No </th>
                                    <th> items</th>
                                    <th> </th>
                                    <th> </th>
                                    <th> </th>
                                    <th> Quantity </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    requisitions.map((requisition, index) => <tr key={requisition._id}>
                                        <td>{index + 1}</td>
                                        <td>{requisition.ল্যাপটপ}</td>
                                        <td>{requisition.date}</td>
                                        <td>
                                            {/* {requisition.requisitionNotes} */}
                                        </td>
                                        {/* <td className='text-center'>
                                    <Link to={`/dashboard/previewRequisition/${createRequisition._id}`} className="btn btn-sm mx-1 bg-success text-white">
                                        <AiOutlineEye /> Preview </Link>
                                </td> */}
                                    </tr>)
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewRequisition;