import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
const ProductEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams();

    // ---------- Drop down budgetCodes get method ----------
    const [budgetCodes, setBudgetCodes] = useState([]);
    useEffect(() => {
        fetch('https://stockmanagementsystemserver-production.up.railway.app/budgetcode')
            .then(res => res.json())
            .then(data => setBudgetCodes(data))
    }, [])
    //---------- update data show method----------
    const [products, setProducts] = useState([]);
    console.log("product", products);
    useEffect(() => {
        const url = `https://stockmanagementsystemserver-production.up.railway.app/product/${id}`
        console.log("product id", url);
        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    const onSubmit = (data) => {
        const productName = data.productName === "" ? products.productName : data.productName;
        const size = data.size === "" ? products.size : data.size;
        const budgetCode = data.budgetCode === "" ? products.budgetCode : data.budgetCode;
        const measureUnit = data.measureUnit === "" ? products.measureUnit : data.measureUnit;
        const packUnit = data.packUnit === "" ? products.packUnit : data.packUnit;
        const qnty = data.qnty === "" ? products.qnty : data.qnty;
        const alertQty = data.alertQty === "" ? products.alertQty : data.alertQty;
        const invoice = data.invoice === "" ? products.invoice : data.invoice;
        const updateData = {
            productName,
            size,
            budgetCode,
            measureUnit,
            packUnit,
            qnty,
            alertQty,
            invoice
        }

        const url = `https://stockmanagementsystemserver-production.up.railway.app/product/${id}`;

        console.log(url)

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
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
                <div className='mt-5'>

                    <form className='mr-3' onSubmit={handleSubmit(onSubmit)}>
                        {/* -----------------------Key type Field ------------------------------ */}

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {/* -------------------- Product Name/ Brand Input Field --------------------   */}
                            <div className="form-control">
                                <label >Product Name</label>
                                <input
                                    type="text"
                                    Value={products.productName}

                                    className={`input input-sm max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.productName && 'border-red-600 focus:border-red-600'}`}
                                    {...register("productName")}
                                />
                                <label className="label">
                                    {errors.productName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productName.message}</span>}

                                </label>
                            </div>

                            {/* -------------------- Budget Code Input Field -----------------------   */}
                            <div className="form-control">
                                <label className='text-start '>Budget Code</label>
                                <select   {...register("budgetCode")}

                                    Value={products.budgetCode}

                                    className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.budgetCode && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>{products.budgetCode}</option>

                                    {
                                        budgetCodes.map((budgetCode) => <option key={budgetCode._id}>{budgetCode.budgetCode}</option>)
                                    }
                                </select>

                                <label className="label">
                                    {errors.budgetCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.budgetCode.message}</span>}

                                </label>
                            </div>
                            {/* ------------------------- Add button ---------------------  */}
                            {/* -------------------- Size / Varient Input Field -----------------------   */}
                            <div className="form-control">
                                <label >Size/Varient</label>
                                <input
                                    type="text"

                                    Value={products.size}

                                    className={`input input-sm max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.size && 'border-red-600 focus:border-red-600'}`}
                                    {...register("size")}
                                />
                                <label className="label">
                                    {errors.size?.type === 'required' && <span className="label-text-alt text-red-700">{errors.size.message}</span>}

                                </label>
                            </div>

                            {/* -------------------- Measure Unit Input Field --------------------   */}
                            <div className="form-control">
                                <label >Measures Unit</label>
                                <select   {...register("measureUnit")}
                                    Value={products.measureUnit}

                                    className={`input input-sm  focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.measureUnit && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>{products.measureUnit}</option>
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
                                <label >Pack Unit</label>
                                <select   {...register("packUnit")}
                                    Value={products.packUnit}

                                    className={`input input-sm   focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.packUnit && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>{products.packUnit}</option>
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
                                <label >Pack Size/Qnty</label>
                                <input
                                    type="text"

                                    Value={products.qnty}
                                    className={`input  max-w-xs input-sm  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.qnty && 'border-red-600 focus:border-red-600'}`}
                                    {...register("qnty")}
                                />
                                <label className="label">
                                    {errors.qnty?.type === 'required' && <span className="label-text-alt text-red-700">{errors.qnty.message}</span>}

                                </label>
                            </div>



                            {/* ----------------------alert Qty input field ------------ */}
                            <div className="form-control">
                                <label >Alert Qty</label>
                                <input
                                    type="text"
                                    Value={products.alertQty}
                                    className={`input input-sm  max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.alertQty && 'border-red-600 focus:border-red-600'}`}
                                    {...register("alertQty")}
                                />
                                <label className="label">
                                    {errors.alertQty?.type === 'required' && <span className="label-text-alt text-red-700">{errors.alertQty.message}</span>}

                                </label>
                            </div>
                            {/* -------------------- Invoice Notes Input Field -----------------------   */}
                            <div className="form-control">
                                <label >Invoice Notes</label>
                                <input
                                    type="text"
                                    Value={products.invoice}
                                    placeholder='Invoice Notes'
                                    className={`input input-sm  max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.invoice && 'border-red-600 focus:border-red-600'}`}
                                    {...register("invoice")}
                                />
                                <label className="label">
                                    {errors.invoice?.type === 'required' && <span className="label-text-alt text-red-700">{errors.invoice.message}</span>}

                                </label>
                            </div>
                        </div>
                        {/* -------------------- Submit and Cancel button--------- */}
                        <div className='lg:flex  justify-start'>
                            <input className='rounded-md  btn btn-sm
                   mx-1 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white  ' type="submit" value='◲ Update' />
                            <Link to="/dashboard/product" className='btn rounded-md px-6 btn-sm outline-2 mx-1 bg-red-600 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white'> <RxCross2 /> back</Link>
                        </div>
                    </form>

                </div>


            </div>
        </div>
    );
};

export default ProductEdit;