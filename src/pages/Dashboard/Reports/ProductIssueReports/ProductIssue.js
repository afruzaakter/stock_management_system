import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import IssueReportsDDU from './IssueReportsDDU';
import IssueReportsPBC from './IssueReportsPBC';
import RequisitionReportsDDU from './RequisitionReportsDDU';

const ProductIssue = () => {
    const [allRequisitions, setAllRequisitions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/createRequisition")
            .then(res => res.json())
            .then(data => setAllRequisitions(data))
    }, [])

    const [issuedRequisions, setIssuedRequisions] = useState([]);
    useEffect(() => {
        const IssuedRequisions = allRequisitions
            .filter(requisition => requisition.status === "Issued")
            setIssuedRequisions(IssuedRequisions)
    }, [allRequisitions]);
    return (
        <div>
           <div className='border-pink-400 rounded-lg border-b '>
           <IssueReportsPBC/>
           </div>
           <div className='border-pink-400 rounded-lg border-b '>
            <IssueReportsDDU/>
           </div>
           <div className='border-pink-400 rounded-lg border-b '>
            <RequisitionReportsDDU/>
            </div>
            

            <div>
                <h2> All requisitions:{issuedRequisions.length} </h2>
            </div>
        </div>
    );
};

export default ProductIssue;