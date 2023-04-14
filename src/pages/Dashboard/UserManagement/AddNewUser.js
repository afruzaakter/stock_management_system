import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';


const AddNewUser = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);


    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch("https://stock-management-system-server.vercel.app/employee")
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    //======= all user get data===========
    const [allUsers, setAllUser] = useState([])
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/user')
            .then(res => res.json())
            .then(data => setAllUser(data))
    }, [])

    const onSubmit = (data) => {
        console.log("role--", data)
        const url = 'https://stock-management-system-server.vercel.app/user'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                toast.success("Data Added Successfully!!!");
                reset();
            })
        navigate('/dashboard/userManagement');
    }



    return (
        <div className='border m-2 p-2 rounded-lg'>
            <div className='p-1 mb-2'>
                <h1 className='text-2xl font-bold'>Create User Account </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>

                        {/* -----------------------Employee Profile Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Employee Profile </label>
                            <select
                                {...register("profile", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                                className={`input input-sm w-80  focus:outline-0 rounded-sm  border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.profile && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>Select your profile </option>
                                {
                                    employees.map((employee) => <option key={employee._id}>{employee.employeeId}-
                                        {employee.employeeName}-[{employee.email}]</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.profile?.type === 'required' && <span className="label-text-alt text-red-700">{errors.profile.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------- Full Name Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start '>Full Name </label>
                            <input
                                type="text"

                                // value={user.displayName}
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.fullName && 'border-red-600 focus:border-red-600'}`}
                                {...register("fullName")}
                            />
                            <label className="label">
                                {errors.fullName?.type === 'required' && <span className="label-text-alt text-red-700"> {errors.fullName.message} </span>}
                            </label>
                        </div>

                        {/* ----------------------- Email Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start '> Email </label>
                            <select
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                                className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                                 focus:border-blue-500 login-container-input ${errors.allUser && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>Select Email </option>
                                {
                                    allUsers.map((allUser) => <option key={allUser._id}>{allUser.email}</option>)
                                }
                            </select>
                            <label className="label">
                                {errors.allUser?.type === 'required' && <span className="label-text-alt text-red-700">{errors.allUser.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------- User-Name Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'> User Name </label>
                            <input
                                type="text"
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.userName && 'border-red-600 focus:border-red-600'}`}
                                {...register("userName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.userName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.userName.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------- Organization Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Organization </label>
                            <select
                                {...register("organization", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                                className={`input input-sm w-80  focus:outline-0 rounded-sm border border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.organization && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>Select User Organization </option>
                                <option > Head Quarter </option>
                            </select>

                            <label className="label">
                                {errors.organization?.type === 'required' && <span className="label-text-alt text-red-700">{errors.organization.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------Assign Role Field --------------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Assign User Role </label>
                            <select   {...register("userRole", {
                                required: {
                                    value: true,
                                    message: "❌  Please fill out this field"
                                }
                            })}

                                type="checkbox"
                                className={`input input-sm w-80  focus:outline-0 rounded-sm  border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.userRole && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''> Select User Role </option>
                                <option > Role_User </option>
                                <option> Role_Admin </option>
                                <option> Role_Approve </option>
                                <option> Role_Authorization </option>
                                <option> Role_Inventory </option>
                                <option> Role_Store </option>
                            </select>

                            <label className="label">
                                {errors.userRole?.type === 'required' && <span className="label-text-alt text-red-700">{errors.userRole.message}</span>}

                            </label>
                        </div>


                    </div>

                    <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Save' />
                    <Link to='/dashboard/userManagement' className="btn btn-sm mx-1 bg-red-600 text-white hover:bg-red-500 hover:text-white"> <RxCross2 /> Cancel
                    </Link>

                </form>
            </div>
        </div>
    );
};

export default AddNewUser;