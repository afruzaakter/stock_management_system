import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const RequisitionIssue = () => {
    const [allRequisitions, setAllRequisitions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/createRequisition")
            .then(res => res.json())
            .then(data => setAllRequisitions(data))
    }, [])
    
    const [allApprovedReq, setAllApprovedReq] = useState([]);
    useEffect(() => {
        const approvedReq = allRequisitions
            .filter(requisition => requisition.isApproved === "Yes")
            .filter(requisition => requisition.isIssued !== "Yes")
            .filter(requisition => requisition.isIssued !== "No");
            setAllApprovedReq(approvedReq)
        
    }, [allRequisitions])


    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Requisition Issue List</h1>
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
            
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> Req_Serial </th>
                            <th> Date </th>
                            <th> Requested By </th>
                            <th> Request Status </th>
                            <th> Note </th>
                            <th className='text-center'> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                            {
                                allApprovedReq?.map((createRequisition, index) => 
                                <tr key={createRequisition._id}>
                                    <td> {createRequisition.autoCode}</td>
                                    <td>{(createRequisition.date).split(" ")[0]}</td>
                                    <td>{createRequisition.userName}</td>
                                    <td> Pending... </td>
                                    <td>{createRequisition.requisitionNotes}</td>
                                    <td className='text-center'>
                                        <Link to={`/dashboard/previewIssue/${createRequisition._id}`} className="btn btn-sm mx-1 bg-success text-white">
                                            <AiOutlineEye /> Preview </Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequisitionIssue;