import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddInventoryModal = ({setUpdated}) => {
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
        setUpdated(true)
        reset();
       })
       navigate('/dashboard/addInventory')
    }

    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="my-modal-3" className="btn btn-sm  mx-1 bg-primary text-white">
                <FaPlus/>  Add </label>


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <div className='bg-green-500 p-2 mb-2 rounded-lg '>
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle bg-red-600 text-white absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold"> Add Inventory </h3>
                    </div>

                    
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='grid place-content-center'>

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

                        <input className='input  focus:outline-0 input-bordered input-primary 
                            max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' 
                            type="submit" value='Submit' />
                        
                    </form>

                    
                </div>
            </div>
        </div>
    );
};

export default AddInventoryModal;