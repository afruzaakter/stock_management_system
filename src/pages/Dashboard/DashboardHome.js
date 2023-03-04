import React from 'react';
import { Link } from 'react-router-dom';
import { MdPendingActions } from 'react-icons/md';
import { GrCompliance } from 'react-icons/gr';
import { useState } from 'react';
import { useEffect } from 'react';

const DashboardHome = () => {

    const [allRequisitions, setAllRequisitions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/createRequisition")
            .then(res => res.json())
            .then(data => setAllRequisitions(data))
    }, [])

    // pending Request-------------------------------------------- 
    const [allCreatedReq, setAllCreatedReq] = useState([]);
    useEffect(() => {
        const notAuthorized = allRequisitions
            .filter(requisition => requisition.isAuthorized !== "Yes")
            .filter(requisition => requisition.isAuthorized !== "No");
        setAllCreatedReq(notAuthorized);
    }, [allRequisitions])
    const pendingRequisitions = +allCreatedReq.length;

    // Authorized requests ---------------------------------------- 
    const [allAuthorizedReq, setAllAuthorizedReq] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions.filter(requisition => requisition.isAuthorized === "Yes");
        setAllAuthorizedReq(authorizedReq);
    }, [allRequisitions]);
    const allAuthorizedRequ = +allAuthorizedReq.length;
    // -------------- All Approved Requests ------------------------------
    const [allApprovedReq, setAllApprovedReq] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions.filter(requisition => requisition.isApproved === "Yes")
            setAllApprovedReq(authorizedReq)
        
    }, [allRequisitions])
    const allApprovedRequisition = +allApprovedReq.length;
    // -------------- All Issued Requests ------------------------------
    const [allIssuedReq, setAllIssuedReq] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions.filter(requisition => requisition.isIssued === "Yes");
        setAllIssuedReq(authorizedReq);
    }, [allRequisitions])
    const allIssuedRequisition = +allIssuedReq.length;

    return (
        <div className='border m-1 p-2 rounded-lg'>
            <div>
                <h1 className='p-2 mb-2 text-2xl font-bold'>Requisition Status: </h1>
            </div>
           
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border border-gray-300 shadow-lg rounded-xl mb-3'>
                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {pendingRequisitions} </h2>
                        <h2 className="text-center text-xl"> Pending Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allAuthorizedRequ} </h2>
                        <h2 className="text-center text-xl"> Authorized Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allApprovedRequisition} </h2>
                        <h2 className="text-center text-xl"> Approved Request  </h2>
                    </div>
                </div>

                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allIssuedRequisition} </h2>
                        <h2 className="text-center text-xl"> Issued Request  </h2>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className="card w-full shadow-xl border border-gray-300 p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-medium'> 21 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-2xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Authorize Request </h1>
                        <Link className='btn btn-sm bg-gray-300 w-full' 
                            to="/dashboard/requisitionAuthorize"> view Request
                        </Link>
                    </div>
                </div>

                <div className="card w-full shadow-lg border border-gray-300 p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-medium '> 32 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-2xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Approve Request </h1>
                        <Link className='btn btn-sm bg-gray-300 w-full' 
                            to="/dashboard/requisitionAuthorize"> view Request
                        </Link>
                    </div>
                </div>

                <div className="card w-full shadow-lg border border-gray-300 p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-medium '> 15 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-2xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Issue Request </h1>
                        <Link className='btn btn-sm bg-gray-300 w-full' 
                            to="/dashboard/requisitionIssue"> view Request
                        </Link>
                    </div>
                </div>

                <div className="card w-full shadow-lg border border-gray-300 p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-medium '> 12 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className='text-xl pr-3 pt-2'>
                            <GrCompliance />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Completed/Issued Request </h1>
                        <Link className='btn btn-sm bg-gray-300 w-full' 
                            to="/dashboard/requisitionAuthorize"> view Request
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DashboardHome;