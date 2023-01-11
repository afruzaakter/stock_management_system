import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const navigate  = useNavigate()
    const {id} = useParams();

    // ---------- Drop down budgetCodes get method ----------
    const [budgetCodes, setBudgetCodes] = useState([]);
     useEffect(()=>{
        fetch('http://localhost:5000/budgetcode')
        .then(res => res.json())
        .then(data => setBudgetCodes(data))
     },[])
     //---------- update data show method----------
     const [products, setProducts] = useState([]);
     useEffect(() => {
        const url = `http://localhost:5000/product/${id}`
          console.log("product id",url);
        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
     const onSubmit = (data) =>{
        const url = `http://localhost:5000/product/${id}`;

        console.log(url)

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                toast.success('Data Update Successfully !!!');
                reset();
            })
        navigate('/dashboard/product')
     }
    return (
        <div className='mt-10 ml-8 '>
           
            <div classNam="  shadow  rounded-lg  ">
            <h1 className='text-2xl font-bold mb-5'>Create/Update Product </h1>
            <div className='card-body bg-gray-200  w-3/4 shadow-lg rounded-lg duration-300 '>

                <form className='mr-3' onSubmit={handleSubmit(onSubmit)}>
                    {/* -----------------------Key type Field ------------------------------ */}

                    <div className='flex gap-3 '>
                        {/* -------------------- Product Name/ Brand Input Field --------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Product Brand/Name</label>
                            <input
                                type="text"
                                Value={products.brandName}
                                placeholder='e.g:CocaCola, Pepsi, Lux .. '
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-64 focus:border-blue-700  login-container-input ${errors.brandName && 'border-red-600 focus:border-red-600'}`}
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
                        {/* -------------------- Size / Varient Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Size/Varient</label>
                            <input
                                type="text"
                                Value={products.size}
                                placeholder='e.g: 500ml, 100gm'
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-64 focus:border-blue-700  login-container-input ${errors.size && 'border-red-600 focus:border-red-600'}`}
                                {...register("size", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.size?.type === 'required' && <span className="label-text-alt text-red-700">{errors.size.message}</span>}

                            </label>
                        </div>
                        {/* -------------------- Budget Code Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='text-start font-bold'>Budget Code</label>
                            <select   {...register("budgetCode")}

                                Value={products.budgetCode}
                                className={`input    focus:outline-0 rounded-lg  border-green-700 mt-1  w-64 focus:border-blue-500  login-container-input ${errors.budgetCode && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                {/* <option  value=''>--Select Budget Code--</option> */}
                                
                                {
                                    budgetCodes.map((budgetCode) => <option>{budgetCode.budgetCode}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.budgetCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.budgetCode.message}</span>}

                            </label>
                        </div>
                        {/* ------------------------- Add button ---------------------  */}
                    </div>
                    <div className='flex gap-3'>
                        {/* -------------------- Measure Unit Input Field --------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Measures Unit</label>
                            <select   {...register("measureUnit", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                            Value={products.measureUnit}
                                className={`input  focus:outline-0 rounded-lg  border-green-700 mt-1  w-64 focus:border-blue-500  login-container-input ${errors.measureUnit && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                {/* <option value=''>--Select Measures Unit--</option> */}
                                <option >Qnty</option>
                                <option >KG</option>
                                <option >Pack</option>

                            </select>
                            <label className="label">
                                {errors.measureUnit?.type === 'required' && <span className="label-text-alt text-red-700">{errors.measureUnit.message}</span>}

                            </label>
                        </div>

                        {/* -------------------- Pack Unit Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Pack Unit</label>
                            <select   {...register("packUnit", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                            Value={products.pactUnit}
                                className={`input   focus:outline-0 rounded-lg  border-green-700 mt-1  w-64 focus:border-blue-500  login-container-input ${errors.packUnit && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                {/* <option value=''>--Select Pack Unit--</option> */}
                                <option >Bosta</option>
                                <option >Box</option>
                                <option >Ream</option>

                            </select>
                            <label className="label">
                                {errors.packUnit?.type === 'required' && <span className="label-text-alt text-red-700">{errors.packUnit.message}</span>}

                            </label>
                        </div>
                        {/* -------------------- Pack Size/Qnty Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Pack Size/Qnty</label>
                            <input
                                type="text"
                                placeholder='Ctn/Bag Quantity'
                                Value={products.qnty}
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-64 focus:border-blue-700  login-container-input ${errors.qnty && 'border-red-600 focus:border-red-600'}`}
                                {...register("qnty", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.qnty?.type === 'required' && <span className="label-text-alt text-red-700">{errors.qnty.message}</span>}

                            </label>
                        </div>

                    </div>
                    <div className='flex gap-3'>
                        {/* -------------------- Sort Order Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Sort Order</label>
                            <input
                                type="text"
                                placeholder='Sort Order'
                                Value={products.sortOrder}
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-64 focus:border-blue-700  login-container-input ${errors.sortOrder && 'border-red-600 focus:border-red-600'}`}
                                {...register("sortOrder", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.sortOrder?.type === 'required' && <span className="label-text-alt text-red-700">{errors.sortOrder.message}</span>}

                            </label>
                        </div>
                        {/* ----------------------alert Qty input field ------------ */}
                        <div className="form-control">
                            <label className='font-bold'>Alert Qty</label>
                            <input
                                type="text"
                                placeholder='Alert Quantity'
                                Value={products.alertQty}
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-64 focus:border-blue-700  login-container-input ${errors.alertQty && 'border-red-600 focus:border-red-600'}`}
                                {...register("alertQty", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.alertQty?.type === 'required' && <span className="label-text-alt text-red-700">{errors.alertQty.message}</span>}

                            </label>
                        </div>
                        {/* -------------------- Invoice Notes Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='font-bold'>Invoice Notes</label>
                            <input
                                type="text"
                                placeholder='Invoice Notes'
                                Value={products.invoice}
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-lg border-green-700 mt-1  w-64 focus:border-blue-700  login-container-input ${errors.invoice && 'border-red-600 focus:border-red-600'}`}
                                {...register("invoice", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.invoice?.type === 'required' && <span className="label-text-alt text-red-700">{errors.invoice.message}</span>}

                            </label>
                        </div>
                    </div>
                    {/* -------------------- Submit and Cancel button--------- */}
                    <div className='flex gap-3'>
                        <input className='input focus:outline-0 input-bordered input-primary  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Update' />
                        <Link to="/dashboard/product" className='btn btn-success btn-outline'>back</Link>
                    </div>
                </form>

            </div>


        </div>
        </div>
    );
};

export default ProductEdit;