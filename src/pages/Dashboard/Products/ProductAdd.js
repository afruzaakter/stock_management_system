import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const ProductAdd = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const onSubmit = (data) =>{

    }
    return (
        <div className="border border-gray-500   w-3/4 ml-36 rounded-lg mt-28 ">
                <div className='card-body'>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* -----------------------Key type Field ------------------------------ */}

                       <div className='flex gap-3'>
                       <div className="form-control">
                            <label className='font-bold'>Product Brand/Name</label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-full focus:border-blue-500  login-container-input ${errors.brandName && 'border-red-600 focus:border-red-600'}`}
                                {...register("brandName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.brandName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.brandName.message}</span>}

                            </label>
                        </div>

                        <div className="form-control">
                            <label className='font-bold'>Product Brand/Name</label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-full focus:border-blue-500  login-container-input ${errors.brandName && 'border-red-600 focus:border-red-600'}`}
                                {...register("brandName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.brandName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.brandName.message}</span>}

                            </label>
                        </div>
                        <div className="form-control">
                            <label className='font-bold'>Product Brand/Name</label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-full focus:border-blue-500  login-container-input ${errors.brandName && 'border-red-600 focus:border-red-600'}`}
                                {...register("brandName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.brandName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.brandName.message}</span>}

                            </label>
                        </div>
                       </div>
                        <div className='flex gap-3'>
                        <input className='input focus:outline-0 input-bordered input-primary  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Submit' />
                        <Link to="/dashboard/product" className='btn btn-success btn-outline'>Cencle</Link>
                        </div>
                    </form>

                </div>

              
            </div>
    );
};

export default ProductAdd;