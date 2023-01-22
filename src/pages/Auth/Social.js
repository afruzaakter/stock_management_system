import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { FcGoogle } from 'react-icons/fc';

const Social = () => {
    const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
    const navigate = useNavigate()
    if(gUser){
        navigate('/dashboard')
    }
    return (
        <>
            <button 
                className="btn btn-sm btn-outline hover:bg-primary" 
                onClick={() => signInWithGoogle()}>  
                <FcGoogle className='pr-2 text-2xl' />
                Login with Google
            </button>
        </>
    );
};

export default Social;