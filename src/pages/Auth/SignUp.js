import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { BsArrowRight } from 'react-icons/bs';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Social from './Social';

const SignUp = () => {
    const navigate = useNavigate();
    // const [
    //     createUserWithEmailAndPassword,
    //     user,
    //     loading,
    //     error,
    //   ] = useCreateUserWithEmailAndPassword(auth);

      const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    // if (gLoading || loading) {
    //     return <Loading />
    // }

    if( user){
        navigate("/dashboard");
    }

    let signUpError;

    if(error ){
        signUpError=<p className='text-red-500'> <small>{error.message }</small> </p>
    }


    const onSubmit = data => {
        // console.log(data)
        // createUserWithEmailAndPassword(data.name, data.email, data.password);
        console.log(data);
        createUserWithEmailAndPassword( data.email, data.password)
    }
    return (
        <div className='h-screen m-auto  mt-10'>
        <div className="card  flex justify-center items-center  bg-gradient-to-r bg-opacity-30 shadow-md ">
       
            <div className="card-body items-center lg:w-96 rounded-md   bg-gray-200 shadow-md">
            <h2 className="text-2xl  text-center uppercase text-blue-800 font-bold ">Create An Account</h2>
        
             <Social/>
                

                {/* ------------- Login Form start ----------------------- */}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ----------------------Your Name input field ------------------------- */}
                    <div className="form-control   max-w-xs">
                        <label className='mb-2 text-xl flex items-center gap-2 font-bold'> <FaRegUser className='font-bold text-2xl text-blue-800' /> Your Name</label>
                        <input
                            type="text"
                            placeholder='Your Name'
                            className="input input-sm rounded-sm border border-blue-900   focus:border-pink-900   lg:w-96  opacity-60 max-w-xs login-container-input"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "❌ User Name is Required"
                                },

                                pattern: {
                                    value: true,
                                    message: '❌ Provide a valid User name'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-700">{errors.name.message}</span>}
                            {errors.name?.type === 'pattern' && <span className="label-text-alt text-red-700">{errors.name.message}</span>}
                        </label>
                    </div>
                    <div className="form-control   max-w-xs">
                        <label className='mb-1 text-xl flex items-center gap-2 font-bold'> <MdOutlineMailOutline className='font-bold text-2xl text-blue-800' /> Your Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-sm rounded-sm border border-blue-900   focus:border-pink-900   lg:w-96  opacity-60 max-w-xs login-container-input"
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
                    <div className="form-control  max-w-xs">
                    <label className='mb-1 text-xl font-bold flex items-center gap-2'> <RiLockPasswordLine className='font-bold text-2xl text-blue-800' /> Password</label>
                        <input
                            type="password"
                           placeholder='Password'
                            className="input input-sm rounded-sm border border-blue-900   focus:border-pink-900 opacity-60  lg:w-96  max-w-xs login-container-input"
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
                    {signUpError}
                    <input className='btn lg:w-96 btn-sm rounded-sm btn-outline  text-xl max-w-xs' type="submit" value='Create Account' />
                </form>

                {/* ------------- Login Form end ----------------------- */}
                <p > <Link className='flex  items-center gap-3 text-xl font-bold mt-1 ml-15' to="/login">Already have an Account <span ><BsArrowRight className='text-3xl font-bold text-blue-800 ' /></span> </Link> </p>
                {/* <p className='text-info text-xl font-bold'>Forgot Password? <Link className='text-white font-bold' to="/reset">Reset Password</Link> </p> */}

                {/* <div className="divider text-white">OR</div> */}
                
            </div>
        </div>
    </div>
    );
};

export default SignUp;