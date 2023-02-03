import React from 'react';
import DepartmentDesignationReport from './DepartmentDesignationReport';
import EmployeeReport from './EmployeeReport';
import UserReport from './UserReport';

const EmployeeUser = () => {
    return (
        <div>
        <div className='border-pink-400 rounded-lg border-b '>
        <EmployeeReport/>
        </div>
        <div className='border-pink-400 rounded-lg border-b '>
       <UserReport/>
        </div>
        <div className='border-pink-400 rounded-lg border-b '>
       <DepartmentDesignationReport/>
        </div>
       
     </div>
    );
};

export default EmployeeUser;