
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <div className='border m-1 p-1 rounded-lg'>
            <div className='border rounded-lg border-blue-600 p-4 mb-2'>
                From:
                <input type="text" placeholder="Search by date" className="input 
                     input-bordered input-sm w-full max-w-xs" />
                To:
                <input type="text" placeholder="Search by date" className="input
                    input-bordered input-sm w-full max-w-xs" />
            </div>
            <div className='flex justify-between gap-4'>
                <div className="card w-96 bg-base-200">
                    <div className="card-body">
                        <h2 className="card-title">Active Requisition </h2>
                        <Link to="/dashboard/requisition" >
                            Click here to view
                        </Link>
                    </div>
                </div>
                <div className="card w-96 bg-base-200">
                    <div className="card-body">
                        <h2 className="card-title">Pending Requisition </h2>
                        <Link to="/dashboard/requisitionAuthorize" >
                            Click here to view
                        </Link>
                    </div>
                </div>
                <div className="card w-96 bg-base-200">
                    <div className="card-body">
                        <h2 className="card-title">Completed Requisition </h2>
                        <Link to="/dashboard/requisitionApproval" >
                            Click here to view
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardHome;