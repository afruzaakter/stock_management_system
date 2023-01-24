import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const AddNewInventory = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
      // ---------- Drop down Product get method ----------
      const [products, setProducts] = useState([]);
      useEffect(()=>{
         fetch('http://localhost:5000/product')
         .then(res => res.json())
         .then(data => setProducts(data))
      },[])
      // ---------- Drop down Product get method ----------
      const [suppliers, setSuppliers] = useState([]);
      useEffect(()=>{
         fetch('http://localhost:5000/supplier')
         .then(res => res.json())
         .then(data => setSuppliers(data))
      },[])

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
        <div className='border m-2 p-2 rounded-lg bg-slate-100'>
            <div className='p-1 mb-2'>
                <h1 className='text-xl font-medium'>Add New Inventory </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>

                        {/* ----------Product Name Field ------------- */}
                        <div className="form-control">
                            <label className='text-start '>Product Name</label>
                            <select   {...register("productName", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.productName && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option  value=''>--Select Product Name--</option>
                                
                                {
                                    products.map((product) => <option>{product.productName}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.productName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productName.message}</span>}

                            </label>
                        </div>

                        {/* ----------------Brand Name Field ------------------ */}
                        <div className="form-control">
                            <label className='text-start '>Supplier Name</label>
                            <select   {...register("supplierName", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.supplierName && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option  value=''>--Select Supplier Name--</option>
                                
                                {
                                    suppliers.map((supplier) => <option>{supplier.suppliercompany}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.supplierName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.supplierName.message}</span>}

                            </label>
                        </div>

                        {/* --------------------Ctn/bag  ----------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Ctn/Bag </label>
                            <input
                                type="number"
                                className={`input input-sm max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1 w-full focus:border-blue-500  login-container-input ${errors.ctn_bag && 'border-red-600 focus:border-red-600'}`}
                                {...register("ctn_bag", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.ctn_bag?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.ctn_bag.message} </span>}
                            </label>
                        </div> 
                        {/* -----------------------Unit Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Unit </label>
                            <input
                                type="number"
                                className={`input input-sm max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1 w-full focus:border-blue-500  login-container-input ${errors.unit && 'border-red-600 focus:border-red-600'}`}
                                {...register("unit", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.unit?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.unit.message} </span>}
                            </label>
                        </div> 
                        {/* ----------------------- Total Quantity ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Total Quantity </label>
                            <input
                                type="number"
                                className={`input input-sm max-w-xs  border-green-700 focus:outline-0 rounded-sm mt-1
                                w-full focus:border-blue-500  login-container-input ${errors.totalQuantity && 
                                'border-red-600 focus:border-red-600'}`}
                                {...register("totalQuantity", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.totalQuantity?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.totalQuantity.message} </span>}
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