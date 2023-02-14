import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../Images/Afruza/notfound.png';
const NotFoundPage = () => {
    return (
        <div className='text-center mt-6  mb-5'>
            <h1 className='text-3xl font-bold mb-2'>Oops..! 404 Page Not Found</h1>
            <p>Looks like you came to wrong page on our server</p>
        <div className='w-full items-center justify-center flex'>
          <img className='w-96' src={notfound} alt=""/>
        </div>
        <div>
            <h>Try Search again or go to Home Page</h>
            <Link  to="/dashboard" className='btn btn-sm btn-secondary ml-4'>Home Page</Link>
        </div>
    </div>
    );
};

export default NotFoundPage;