import React from 'react';
import IssueReportsDDU from './IssueReportsDDU';
import IssueReportsPBC from './IssueReportsPBC';
import RequisitionReportsDDU from './RequisitionReportsDDU';

const ProductIssue = () => {
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
        </div>
    );
};

export default ProductIssue;