import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const AddNewEmployee = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth)



    //----------Designation Fetch Data------------
    const [designations, setDesignations] = useState([]);
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/designation')
            .then(res => res.json())
            .then(data => setDesignations(data))
    }, [])
    //----------Department Fetch Data------------
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/department')
            .then(res => res.json())
            .then(data => setDepartments(data))
    }, [])

    // Show Orders 
    const [selectDepartment, setSelectDepartment] = useState([]);
    const selectedDepartment = departments.filter(department => department.name === selectDepartment);
    const showOrders = selectedDepartment.map((showOrder) => showOrder.order)
    console.log(showOrders)


    //======= all user get data===========
    const [allUsers, setAllUser] = useState([])
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/user')
            .then(res => res.json())
            .then(data => setAllUser(data))
    }, [])

    //Unique All User Name
    const uniqueAllUser = allUsers.filter((newUser, index, self) =>
        index === self.findIndex((userEmail) => (
            userEmail.email === newUser.email))
    );



    const onSubmit = (data) => {
        console.log("employee", data)
        const updateData = {
            employeeName: data.employeeName,
            mobileNo: data.mobileNo,
            employeeId: data.employeeId,
            designation: data.designation,
            department: data.department,
            showOrders

        }
        const url = 'https://stock-management-system-server.vercel.app/employee'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(updateData),
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
        navigate('/dashboard/employee');
    }


    return (
        <div className='border m-2 p-2 rounded-lg'>
            <div className='p-1 mb-2'>
                <h1 className='text-xl font-medium'>Add New Employee </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>

                        {/* ----------------------- Name Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Name </label>
                            <input
                                type="text"

                                // value={user.displayName}
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.employeeName && 'border-red-600 focus:border-red-600'}`}
                                {...register("employeeName")}
                            />
                            <label className="label">
                                {errors.employeeName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.employeeName.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------- Mobile No. Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'> Mobile No </label>
                            <input
                                type="text"
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.mobileNo && 'border-red-600 focus:border-red-600'}`}
                                {...register("mobileNo", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.mobileNo?.type === 'required' && <span className="label-text-alt text-red-700">{errors.mobileNo.message}</span>}
                            </label>
                        </div>

                        {/* -----------------------Employee Id Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start '>Id/Code</label>
                            <input
                                type="text"
                                className={`input input-sm max-w-xs border border-green-700 focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500 login-container-input ${errors.employeeId && 'border-red-600 focus:border-red-600'}`}
                                {...register("employeeId", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.employeeId?.type === 'required' && <span className="label-text-alt text-red-700">{errors.employeeId.message}</span>}
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
                                    uniqueAllUser.map((allUser) => <option key={allUser._id}>{allUser.email}</option>)
                                }
                            </select>
                            <label className="label">
                                {errors.allUser?.type === 'required' && <span className="label-text-alt text-red-700">{errors.allUser.message}</span>}
                            </label>
                        </div>

                        {/* -----------------------Designation Name Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Designation </label>
                            <select
                                {...register("designation", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                                className={`input input-sm   border border-green-700 mt-1 w-80 focus:outline-0 rounded-sm  
                                 focus:border-blue-500 login-container-input ${errors.designation && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>Select designation </option>
                                {
                                    designations.map((designation) => <option>{designation.name}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.designation?.type === 'required' && <span className="label-text-alt text-red-700">{errors.designation.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------Department Name Field --------------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Department </label>
                            <select
                                onClick={e => setSelectDepartment(e.target.value)}

                                {...register("department", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                                className={`input input-sm  w-80  focus:outline-0 rounded-sm  border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.department && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''> Select Department</option>
                                {
                                    departments.map((department) => <option>{department.name}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.department?.type === 'required' && <span className="label-text-alt text-red-700">{errors.department.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------- Show Order Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'> Show Order </label>

                            <input
                                // disabled
                                placeholder='auto generate'
                                type="text"
                                Value={showOrders}
                                className={`input input-sm max-w-xs 
                                 font-bold py-2 px-4   border-green-700 hover:border-green-700  focus:outline-0 rounded-sm mt-1 
                                  w-96 focus:border-blue-500  login-container-input ${errors.order && 'border-red-600 focus:border-red-600'}`}
                                {...register("order",
                                )}
                            />
                            <label className="label">
                                {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}
                            </label>
                        </div>




                    </div>

                    <input className='input  btn btn-sm px-8  mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Save' />
                    <Link to='/dashboard/employee' className="btn btn-sm px-6 font-bold mx-1 bg-red-600 text-white hover:bg-red-500 hover:text-white"> <RxCross2 /> Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
};


export default AddNewEmployee;