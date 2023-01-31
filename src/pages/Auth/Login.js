import React from 'react';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init'
import { useSignInWithEmailAndPassword, useSignInWithGoogle  } from 'react-firebase-hooks/auth';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { useEffect } from 'react';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    // ------ if user ? then-> navigate --------- 
    const [token]=useToken(user || gUser )
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/dashboard";
    useEffect(()=>{
       if( token){
        navigate(from, { replace: true });
    }  
    },[token,from,navigate])
   

    // -----------------
    if (gLoading || loading) {
        return <Loading />
    }

    let signInError;
    if(error ){
        signInError=<p className='text-red-500'> <small>{error.message }</small> </p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl ">
                <div className="card-body">
                    <h2 className="text-2xl  text-center uppercase font-bold ">Login </h2>

                    {/* ------------- Login Form start ----------------------- */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* -------------Email input field ------- */}
                        <div className="form-control w-full max-w-xs">
                            <label className='flex items-center gap-1 font-bold'>
                                <MdOutlineMailOutline className='font-bold' />Email
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-sm rounded-sm w-full max-w-xs  border-gray-800 focus:outline-0  focus:border-blue-500 login-container-input"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "❌ Email is Required"
                                    },

                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: '❌ Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}
                            </label>
                        </div>

                        {/* ------------- Password input field ----------------------- */}
                        <div className="form-control w-full max-w-xs">
                        <label className='flex items-center font-bold gap-1'> 
                            <RiLockPasswordLine className='font-bold' /> Password
                        </label>
                            <input
                                type="password"
                                placeholder='Password'
                                className="input input-sm rounded-sm w-full max-w-xs  border-gray-800 focus:outline-0  focus:border-blue-500 login-container-input"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "❌ Password is Required"
                                    },

                                    minLength: {
                                        value: 6,
                                        message: '❌ Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-700">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn btn-sm w-full rounded-md  text-white bg-primary hover:bg-green-700 max-w-xs' type="submit" value='Login' />
                    </form>
                    {/* ------------- Login Form end ----------------------- */}
                    
                    <p>New to BFSA? <Link className='text-green-800' to="/signup">Create New Account</Link></p>
                    <div className="divider">OR</div>

                    <button 
                        onClick={() => signInWithGoogle()} 
                        className="btn btn-sm btn-outline hover:bg-primary"> 
                        <FcGoogle className='pr-2 text-2xl' /> Login with Google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Login;