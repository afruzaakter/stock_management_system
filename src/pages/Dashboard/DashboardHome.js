import React from 'react';
import { Link } from 'react-router-dom';
import { MdPendingActions } from 'react-icons/md';
import { GrCompliance } from 'react-icons/gr';

const DashboardHome = () => {
    return (
        <div className='border m-1 p-2 rounded-lg'>
            <div>
                <h1 className='p-2 mb-2 text-2xl font-bold'> 
                My Requisition Status</h1>
            </div>
           
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border border-primary rounded-xl mb-3'>
                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Pending Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Authorized Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Approved Request  </h2>
                    </div>
                </div>

                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Issued Request  </h2>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className="card w-full shadow-lg border border-primary p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold pl-5'> 0 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-4xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Authorize Request </h1>
                        <Link className='btn btn-sm btn-success w-full' 
                            to="/dashboard/requisitionAuthorize"> view Request
                        </Link>
                    </div>
                </div>

                <div className="card w-full shadow-lg border border-primary p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold pl-5'> 0 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-4xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Approve Request </h1>
                        <Link className='btn btn-sm btn-success w-full' 
                            to="/dashboard/requisitionAuthorize"> view Request
                        </Link>
                    </div>
                </div>
                <div className="card w-full shadow-lg border border-primary p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold pl-5'> 0 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-4xl pr-3 pt-2'>
                            <MdPendingActions />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Pending to Issue Request </h1>
                        <Link className='btn btn-sm btn-success w-full' 
                            to="/dashboard/requisitionIssue"> view Request
                        </Link>
                    </div>
                </div>

                <div className="card w-full shadow-lg border border-primary p-3 ">
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold pl-5'> 0 </h1>
                            <p className='text-xl'> Requests</p>
                        </div>
                        <div className=' text-4xl pr-3 pt-2'>
                            <GrCompliance />
                        </div>
                    </div>
                    <div className='pt-2'>
                        <h1 className='pb-2'> Completed/Issued Request </h1>
                        <Link className='btn btn-sm btn-success w-full' 
                            to="/dashboard/requisitionAuthorize"> view Request
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardHome;