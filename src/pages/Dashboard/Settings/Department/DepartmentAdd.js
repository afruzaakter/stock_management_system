import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const DepartmentAdd = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    // const [updated, setUpdated] = useState(false);
    const navigate = useNavigate()

    // ------------- data post method -----------
    const onSubmit = (data) => {
        const url = "https://stock-management-system-server.vercel.app/department"
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Data added Successfully!!!');
                // setUpdated(!updated)
                reset();
            })
        navigate('/dashboard/department')
    }
    return (
        <div className='m-10'>
            <h1 className='text-2xl font-bold'>Create Department</h1>
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start '>Department Name</label>
                            <input
                                type="text"
                                className={`input input-sm max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-96  focus:border-blue-500  login-container-input ${errors.name && 'border-red-600 focus:border-red-600'}`}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fill-Up  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-700">{errors.name.message}</span>}

                            </label>
                        </div>
                        {/* -----------------------Department Description Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start '>Description</label>
                            <textarea
                                type="text"
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm  mt-1  lg:w-96 focus:border-blue-500  login-container-input ${errors.description && 'border-red-600 focus:border-red-600'}`}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fill-Up  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.description?.type === 'required' && <span className="label-text-alt text-red-700">{errors.description.message}</span>}

                            </label>
                        </div>
                        {/* -----------------------Department Show Order Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Show Order</label>
                            <input
                                type="number"
                                className={`input input-sm max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-96 focus:border-blue-500  login-container-input ${errors.order && 'border-red-600 focus:border-red-600'}`}
                                {...register("order", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fill-Up  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}

                            </label>
                        </div>
                    </div>

                    <input className='input rounded-md px-6  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Submit' />

                    <Link to='/dashboard/department' className="btn btn-sm rounded-md px-6 mx-1 bg-red-600 text-white  max-w-xs cursor-pointer uppercase hover:bg-primary hover:text-white"><RxCross2 />
                        cancel</Link>


                </form>
            </div>

        </div >
    );
};

export default DepartmentAdd;