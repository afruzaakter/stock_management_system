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
  
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    // if (gLoading || loading) {
    //     return <Loading />
    // }

    if( user){
        navigate("/dashboard/dashboardhomepage");
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
        <div className='h-screen m-auto mt-16 '>
            <div className="card  bg-gray-200 border border-blue-800 bg-gradient-to-r bg-opacity-30 shadow-md ">
           
                <div className="card-body items-center">
                <h2 className="text-4xl  text-center uppercase  text-blue-800 font-bold ">Create An Account</h2>
            
                 <Social/>
                    

                    {/* ------------- Login Form start ----------------------- */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* ----------------------Email input field ------------------------- */}
                        <div className="form-control   max-w-xs">
                            <label className='mb-2  text-xl flex items-center gap-2 font-bold'> <MdOutlineMailOutline className='font-bold text-2xl text-blue-800' /> Your Email</label>
                            <input
                                type="email"
                                // placeholder="Your Email"
                                className="input  border border-blue-900   focus:border-pink-900   w-96  opacity-60 max-w-xs login-container-input"
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
                        <label className='mb-2 text-xl font-bold flex items-center gap-2'> <RiLockPasswordLine className='font-bold text-2xl text-blue-800' /> Password</label>
                            <input
                                type="password"
                              
                                className="input border border-blue-900   focus:border-pink-900 opacity-60  w-full max-w-xs login-container-input"
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
                        <input className='btn w-full btn-outline  text-xl max-w-xs' type="submit" value='Login' />
                    </form>

                    {/* ------------- Login Form end ----------------------- */}
                    <p > <Link className='flex  items-center gap-3 text-xl font-bold mt-4 ml-15' to="/signup">Create New Account <span ><BsArrowRight className='text-3xl font-bold text-blue-800 ' /></span> </Link> </p>
                    {/* <p className='text-info text-xl font-bold'>Forgot Password? <Link className='text-white font-bold' to="/reset">Reset Password</Link> </p> */}

                    {/* <div className="divider text-white">OR</div> */}
                    
                </div>
            </div>
        </div>
    );
};

export default Login;