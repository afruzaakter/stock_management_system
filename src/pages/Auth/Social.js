import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import google from '../Images/Afruza/googleicon.webp';

const Social = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const navigate = useNavigate()
    if(gUser){
        navigate('/dashboard')
    }
    return (
        <div>
             <button className="btn  mt-2 mb-3 text-2xl  btn-outline" onClick={() => signInWithGoogle()}>  
                <img className='text-white object-cover h-6 w-6 mr-3' src={google} alt=""/>
                Login with Google</button>
                <p className='text-xl text-center font-bold m-1 text-blue-800'>Or Sign Up Using Details</p>
        </div>
    );
};

export default Social;