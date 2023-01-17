import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const AddNewInventory = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    // ------------- AddInventory Data post method -----------
    const onSubmit = (data) => {
       const url = "http://localhost:5000/addInventory"
       fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
           'Content-type' : 'application/json; charset=UTF-8', 
        },
       })
       .then(res => res.json())
       .then(data =>{
        console.log(data)
        toast.success('Data added Successfully!!!');
        // setUpdated(true)
        reset();
       })
       navigate('/dashboard/addInventory')
    }

    return (
        <div className='border m-2 p-2 rounded-lg'>
            <div className='p-1 mb-2'>
                <h1 className='text-xl font-medium'>Add New Inventory </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>

                        {/* ----------Purchase Field ------------- */}
                        <div className="form-control">
                            <label className='text-start'>Purchase </label>
                            <input
                                type="text"
                                className={`input input-md max-w-xs border border-green-700 focus:outline-0 rounded-sm mt-1  w-full  focus:border-blue-500  login-container-input ${errors.purchase && 'border-red-600 focus:border-red-600'}`}
                                {...register("purchase", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.purchase?.type === 'required' && <span className="label-text-alt text-red-700"> 
                                    {errors.purchase.message} </span>}
                            </label>
                        </div>

                        {/* ----------------Supplier Name Field ------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Supplier Name </label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs border border-green-700 focus:outline-0 rounded-sm mt-1 w-full focus:border-blue-500  login-container-input ${errors.supplierName && 'border-red-600 focus:border-red-600'}`}
                                {...register("supplierName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.supplierName?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.supplierName.message}</span>}
                            </label>
                        </div> 

                        {/* --------------------Mobile ----------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Mobile </label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1 w-full focus:border-blue-500  login-container-input ${errors.mobile && 'border-red-600 focus:border-red-600'}`}
                                {...register("mobile", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.mobile?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.mobile.message} </span>}
                            </label>
                        </div> 
                        {/* -----------------------Accepted Note Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Accepted Note </label>
                            <textarea
                                type="text"
                                className={`input font-bold max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1 w-full focus:border-blue-500  login-container-input ${errors.acceptedNote && 'border-red-600 focus:border-red-600'}`}
                                {...register("acceptedNote", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.acceptedNote?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.acceptedNote.message} </span>}
                            </label>
                        </div> 
                        {/* ----------------------- Creator Number ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Created Number </label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1
                                w-full focus:border-blue-500  login-container-input ${errors.createdNumber && 
                                'border-red-600 focus:border-red-600'}`}
                                {...register("createdNumber", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.createdNumber?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.createdNumber.message} </span>}
                            </label>
                        </div> 
                        {/* ----------------------- last Update date  ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Last Update Date  </label>
                            <input
                                type="date"
                                className={`input font-bold max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1
                                w-full focus:border-blue-500  login-container-input ${errors.lastUpdateDate && 
                                'border-red-600 focus:border-red-600'}`}
                                {...register("lastUpdateDate", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.lastUpdateDate?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.lastUpdateDate.message} </span>}
                            </label>
                        </div> 
                        {/* -----------------------   ------------------------------ */}



                    </div>  

                    <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit"  value='◲ Save' /> 
                    <Link to='/dashboard/AddInventory' className="btn btn-sm mx-1 bg-red-600 text-white hover:bg-red-500 hover:text-white"> <RxCross2/> Cancel 
                    </Link>
                </form>
            </div>

        </div>
    );
};

export default AddNewInventory;