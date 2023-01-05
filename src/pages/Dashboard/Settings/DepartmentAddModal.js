import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DepartmentAddModal = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    // const [updated, setUpdated] = useState(false);
    const navigate = useNavigate()

    // ------------- data post method -----------
    const onSubmit = (data) => {
       const url = "http://localhost:5000/department"
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
        // setUpdated(!updated)
        reset();
       })
       navigate('/dashboard/department')
    }
    return (
        <div>

            <label for="my-modal-6" className="btn btn-sm mx-1 bg-green-700 text-white"><FaPlus /> Add</label>


            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal justify-start ml-96 mt-28  modal-bottom sm:modal-middle">
                <div className="modal-box w-11/12 max-w-5xl ">
                <label for="my-modal-6" className="btn btn-sm btn-circle absolute  right-2 bg-green-600 text-white hover:bg-green-900">✕</label>
                    <h3 className="font-bold text-xl   bg-green-600 text-white p-1 mb-5">Create Department</h3>
                    <form onSubmit={handleSubmit(onSubmit)} >
                      <div>
                          {/* -----------------------Department Name Field ------------------------------ */}

                          <div className="form-control">
                            <label className='text-start ml-16'>Department Name</label>
                            <input
                                type="text"
                                className={`input font-bold max-w-xs border border-green-700 focus:outline-0 rounded-sm border-gray-400 mt-1  w-full ml-16 focus:border-blue-500  login-container-input ${errors.name && 'border-red-600 focus:border-red-600'}`}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-700">{errors.name.message}</span>}

                            </label>
                        </div>   
                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start ml-16'>Description</label>
                            <textarea
                                type="text"
                                className={`input font-bold max-w-xs  border-green-700 ml-16 focus:outline-0 rounded-sm border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.description && 'border-red-600 focus:border-red-600'}`}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.description?.type === 'required' && <span className="label-text-alt text-red-700">{errors.description.message}</span>}

                            </label>
                        </div> 
                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start ml-16'>Show Order</label>
                            <input
                                type="number"
                                className={`input font-bold max-w-xs border-green-700 ml-16  focus:outline-0 rounded-sm border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.order && 'border-red-600 focus:border-red-600'}`}
                                {...register("order", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}

                            </label>
                        </div> 
                      </div>  

                       <input className='input  focus:outline-0 input-bordered input-primary  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Submit' />
                     
                       
                       
                    </form>

                </div>
            </div>
           
        </div >
    );
};

export default DepartmentAddModal;