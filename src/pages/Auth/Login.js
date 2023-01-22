import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init'
import { useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth';
import Social from './Social';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    // if (gLoading || loading) {
    //     return <Loading />
    // }

    if( user){
        navigate("/dashboard");
    }

    let signInError;
    if(error ){
        signInError=<p className='text-red-500'> <small>{error.message }</small> </p>
    }

    const onSubmit = data => {
        console.log(data)
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
                                <MdOutlineMailOutline className='font-bold' /> Your Email
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
                    <Social/>

                </div>
            </div>
        </div>
    );
};

export default Login;