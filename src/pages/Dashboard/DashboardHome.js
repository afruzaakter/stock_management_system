
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <div className='border m-1 p-2 rounded-lg'>
            <div>
                <h1 className='p-2 mb-2 text-2xl font-bold'> 
                My Requisition Status</h1>
            </div>
           
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 border border-primary rounded-xl mb-3'>
                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Pending Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Pending Request  </h2>
                    </div>
                </div>

                <div className="card w-full">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Pending Request  </h2>
                    </div>
                </div>

                <div className="card w-full ">
                    <div className="card-body">
                        <h2 className="text-center text-4xl "> 0 </h2>
                        <h2 className="text-center text-xl"> Pending Request  </h2>
                    </div>
                </div>

            </div>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className="card w-full shadow-lg border border-primary">
                    <div className="card-body">
                        <h2 className="card-title">Active Requisition </h2>
                        <Link to="/dashboard/requisition" >
                            Click here to view
                        </Link>
                    </div>
                </div>
                <div className="card w-full shadow-lg border border-primary">
                    <div className="card-body">
                        <h2 className="card-title">Pending Requisition </h2>
                        <Link to="/dashboard/requisitionAuthorize" >
                            Click here to view
                        </Link>
                    </div>
                </div>
                <div className="card w-full shadow-lg border border-primary">
                    <div className="card-body">
                        <h2 className="card-title">Completed Requisition </h2>
                        <Link to="/dashboard/requisitionApproval" >
                            Click here to view
                        </Link>
                    </div>
                </div>
                <div className="card w-full shadow-lg border border-primary">
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