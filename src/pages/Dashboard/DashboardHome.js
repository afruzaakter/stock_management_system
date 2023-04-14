import React from 'react';
import { Link } from 'react-router-dom';
import { MdPendingActions } from 'react-icons/md';
import { GrCompliance } from 'react-icons/gr';
import { useState } from 'react';
import { useEffect } from 'react';

const DashboardHome = () => {

    const [allRequisitions, setAllRequisitions] = useState([]);
    useEffect(() => {
        fetch("https://stock-management-system-server.vercel.app/createRequisition")
            .then(res => res.json())
            .then(data => setAllRequisitions(data))
    }, [])

    // ---------------All Request----------------------------- 
    const allCreatedRequisitions = +allRequisitions.length;
    // ---------------Authorized requests ------------------------- 
    const [allAuthorizedReq, setAllAuthorizedReq] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions.filter(requisition => requisition.status === "Authorized");
        setAllAuthorizedReq(authorizedReq);
    }, [allRequisitions]);
    const allAuthorizedRequisitions = +allAuthorizedReq.length;

    // -------------- All Approved Requests ------------------------------
    const [allApprovedReq, setAllApprovedReq] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions.filter(requisition => requisition.status === "Approved")
        setAllApprovedReq(authorizedReq)
    }, [allRequisitions])
    const allApprovedRequisitions = +allApprovedReq.length;

    // -------------- All Issued Requests ------------------------------
    const [allIssuedReq, setAllIssuedReq] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions.filter(requisition => requisition.status === "Issued");
        setAllIssuedReq(authorizedReq);
    }, [allRequisitions])
    const allIssuedRequisitions = +allIssuedReq.length;

    // ==================== For Pending ================================

    //------------- pending Authorization-----------
    const [allCreatedReq, setAllCreatedReq] = useState([]);
    useEffect(() => {
        const notAuthorized = allRequisitions
            .filter(requisition => requisition.status === "Pending");
        setAllCreatedReq(notAuthorized);
    }, [allRequisitions])
    const pendingRequisitions = +allCreatedReq.length;
    // ------------- pending approved requests------------
    const [allAuthorized, setAllAuthorized] = useState([]);
    useEffect(() => {
        const authorizedReq = allRequisitions
            .filter(requisition => requisition.status === "Authorized");
        setAllAuthorized(authorizedReq);
    }, [allRequisitions]);
    const pendingApproved = +allAuthorized.length;
    // ----------------------- Pending Issued -----------------------
    const [allApproved, setAllApproved] = useState([]);
    useEffect(() => {
        const approvedReq = allRequisitions
            .filter(requisition => requisition.status === "Approved");
        setAllApproved(approvedReq)
    }, [allRequisitions])
    const pendingIssued = +allApproved.length;

    return (
        <div className='border m-1 p-2 rounded-lg'>
            <div>
                <h1 className='p-2 mb-2 text-2xl font-bold'>Requisition Status: </h1>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border border-gray-300 shadow-lg rounded-xl mb-3'>
                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allCreatedRequisitions} </h2>
                        <h2 className="text-center text-xl"> All Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allAuthorizedRequisitions} </h2>
                        <h2 className="text-center text-xl"> Authorized Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allApprovedRequisitions} </h2>
                        <h2 className="text-center text-xl"> Approved Request  </h2>
                    </div>
                </div>

                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-3xl "> {allIssuedRequisitions} </h2>
                        <h2 className="text-center text-xl"> Issued Request  </h2>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className="card w-full shadow-xl border border-gray-300 p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-medium'> {pendingRequisitions} </h1>
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
                            <h1 className='text-2xl font-medium '> {pendingApproved} </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-2xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Approve Request </h1>
                        <Link className='btn btn-sm bg-gray-300 w-full'
                            to="/dashboard/requisitionApproval"> view Request
                        </Link>
                    </div>
                </div>

                <div className="card w-full shadow-lg border border-gray-300 p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-2xl font-medium '> {pendingIssued} </h1>
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
                            <h1 className='text-2xl font-medium '> {allIssuedRequisitions} </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className='text-xl pr-3 pt-2'>
                            <GrCompliance />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Completed/Issued Request </h1>
                        <Link className='btn btn-sm bg-gray-300 w-full'
                            to="/dashboard"> view Request
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DashboardHome;