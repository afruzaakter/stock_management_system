import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
const ProductAdd = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate()

    // ---------- Drop down budgetCodes get method ----------
    const [budgetCodes, setBudgetCodes] = useState([]);
    console.log(budgetCodes)
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/budgetcode')
            .then(res => res.json())
            .then(data => setBudgetCodes(data))
    }, [])

    //---------------------autocode--------------
    // ---------- Drop down budgetCodes get method ----------
    const [products, setProduct] = useState([]);
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/product')
            .then(res => res.json())
            .then(data => setBudgetCodes(data))
    }, [])

    const [autoCode, setAutoCode] = useState();
    useEffect(() => {
        const codeList = products?.map(product => product.autoCode);
        const length = codeList.length;
        if (length === 0) {
            setAutoCode(1000)
        } else {
            const lastValue = codeList[length - 1];
            const lastCode = +lastValue;
            setAutoCode(lastCode + 1)
        }
    }, [products]);


    // ---------------- post method product -----------
    const onSubmit = (data) => {
        const updateData = {
            autoCode: autoCode,
            productName: data.productName,
            budgetCode: data.budgetCode,
            measureUnit: data.measureUnit,
            packUnit: data.packUnit,
            alertQnty: data.alertQnty,
            invoice: data.invoice
        }
        const url = "https://stock-management-system-server.vercel.app/product"
        fetch(url, {
            method: "POST",
            body: JSON.stringify(updateData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Data added Successfully!!!');
                setUpdated(!updated)
                reset();
            })
        navigate('/dashboard/product');

    }
    return (
        <div className='mt-5 ml-8 '>

            <div classNam="  shadow  rounded-sm  ">
                <h1 className='text-2xl  mb-5'>Add New Product </h1>
                <div >

                    <form className='mr-3' onSubmit={handleSubmit(onSubmit)}>
                        {/* -----------------------Key type Field ------------------------------ */}

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {/* -------------------- Product Name/ Brand Input Field --------------------   */}
                            <div className="form-control">
                                <label >Product Name</label>
                                <input
                                    type="text"
                                    placeholder='e.g:CocaCola, Pepsi, Lux .. '
                                    className={`input input-sm max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.productName && 'border-red-600 focus:border-red-600'}`}
                                    {...register("productName", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fillup  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.productName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productName.message}</span>}

                                </label>
                            </div>



                            {/* -------------------- Budget Code Input Field -----------------------   */}
                            <div className="form-control">
                                <label className='text-start '>Budget Code</label>
                                <select   {...register("budgetCode", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                                    className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.budgetCode && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>--Select Budget Code--</option>

                                    {
                                        budgetCodes.map((budgetCode) => <option key={budgetCode._id}>{budgetCode.budgetCode}</option>)
                                    }
                                </select>

                                <label className="label">
                                    {errors.budgetCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.budgetCode.message}</span>}

                                </label>
                            </div>
                            {/* -------------------- Size / Varient Input Field -----------------------   */}
                            {/* <div className="form-control">
                                <label >Size/Varient</label>
                                <input
                                    type="text"
                                    placeholder='e.g: 500ml, 100gm'
                                    className={`input input-sm max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.size && 'border-red-600 focus:border-red-600'}`}
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
                            </div> */}

                            {/* -------------------- Measure Unit Input Field --------------------   */}
                            <div className="form-control">
                                <label >Measures Unit</label>
                                <select   {...register("measureUnit", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                                    className={`input input-sm  focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.measureUnit && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>--Select Measures Unit--</option>
                                    <option >Qnty</option>
                                    <option >kg</option>
                                    <option >gm</option>
                                    <option >ml</option>
                                    <option >Pack</option>

                                </select>
                                <label className="label">
                                    {errors.measureUnit?.type === 'required' && <span className="label-text-alt text-red-700">{errors.measureUnit.message}</span>}

                                </label>
                            </div>

                            {/* -------------------- Pack Unit Input Field -----------------------   */}
                            <div className="form-control">
                                <label >Pack Unit</label>
                                <select   {...register("packUnit", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                                    className={`input input-sm   focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.packUnit && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>--Select Pack Unit--</option>
                                    <option >Bosta</option>
                                    <option >Box</option>
                                    <option >Ream</option>

                                </select>
                                <label className="label">
                                    {errors.packUnit?.type === 'required' && <span className="label-text-alt text-red-700">{errors.packUnit.message}</span>}

                                </label>
                            </div>
                            {/* -------------------- Alert Quantity Input Field -----------------------   */}
                            <div className="form-control">
                                <label >Alert Quantity</label>
                                <input
                                    type="text"
                                    placeholder='Alert Quantity'
                                    className={`input  max-w-xs input-sm  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.totalQnty && 'border-red-600 focus:border-red-600'}`}
                                    {...register("alertQnty", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fillup  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.alertQnty?.type === 'required' && <span className="label-text-alt text-red-700">{errors.alertQnty.message}</span>}

                                </label>
                            </div>




                            {/* -------------------- Invoice Notes Input Field -----------------------   */}
                            <div className="form-control">
                                <label >Invoice Notes</label>
                                <input
                                    type="text"
                                    placeholder='Invoice Notes'
                                    className={`input input-sm  max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.invoice && 'border-red-600 focus:border-red-600'}`}
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
                        <div className='lg:flex justify-start'>
                            <input className='rounded-md  btn btn-sm 
                   mx-1 bg-green-700 text-white  px-6 max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white  ' type="submit" value='◲ Submit' />
                            <Link to="/dashboard/product" className='btn rounded-md btn-sm px-6 outline-2 mx-1 bg-red-600 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white'> <RxCross2 /> Cancel</Link>
                        </div>
                    </form>

                </div>


            </div>
        </div>
    );
};

export default ProductAdd;