import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const StockAdjustAdd = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams()
    //------------- product brand name dropdown show data ---------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])
    //------------- stock adjust update show data get method ---------

    // const [stockAdjust, setStockAdjust] = useState([]);
    // useEffect(() => {
    //     const url = `http://localhost:5000/stockadjust/${id}`
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => setStockAdjust(data));
    // }, []);
    // console.log("kkkkkkkkkk",stockAdjust)

    //------------- stock adjust data get method ---------
    const [stockAdjusts, setStockAdjusts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/stockadjust')
            .then(res => res.json())
            .then(data => setStockAdjusts(data));
    }, [updated])
  

    console.log(stockAdjusts)
     const totalAmount = () =>{
        const quantity = stockAdjusts.quantity;
        console.log(quantity)
        const price = stockAdjusts.price;
        const totalAmount = quantity * price;
        console.log(totalAmount)
     }

    // const [total, setTotalAmount] = useState(0)

    console.log(totalAmount)
    const onSubmit = (data) => {
        const url = 'http://localhost:5000/stockadjust'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success("Data Added Successfully!!!");
                setUpdated(!updated)
                reset();
            })
        //   navigate('/dashboard/productKey');
    }

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            const url = `http://localhost:5000/stockadjust/${id}`
            console.log(url)
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = stockAdjusts.filter(stockAdjust => stockAdjust._id !== id)
                    setStockAdjusts(remaining);
                })
        }
    }
    return (
        <div className='ml-8  m-3  '>
          <h1 className='text-2xl font-bold mb-5'>Stock Adjust</h1>
            <div className='lg:flex gap-3'>
                
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className=''>

                            <div className='lg:flex gap-3'>
                                 {/* -----------------------Date Field ------------------------------ */}
                            <div className="form-control">
                                <label className='text-start '>Date</label>
                                <input
                                    type="date"
                                    className={`input input-sm  max-w-xs border border-green-800 focus:outline-0 rounded-sm  mt-1  lg:w-64  md:w-48  focus:border-blue-800  login-container-input ${errors.date && 'border-red-600 focus:border-red-600'}`}
                                    {...register("date", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fill-Up  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.date?.type === 'required' && <span className="label-text-alt text-red-700">{errors.date.message}</span>}

                                </label>
                            </div>

                            {/* -----------------------Note input Field ------------------------------ */}

                            <div className="form-control">
                                <label className='text-start ml-4'>Notes</label>
                                <input
                                    type="text"
                                    placeholder='Notes'
                                    className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-64   focus:border-blue-500  login-container-input ${errors.notes && 'border-red-600 focus:border-red-600'}`}
                                    {...register("notes", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fill-Up  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.notes?.type === 'required' && <span className="label-text-alt text-red-700">{errors.notes.message}</span>}

                                </label>
                            </div>
                            {/* -----------------------Adjust Reason Field ------------------------------ */}

                            <div className="form-control">
                                <label className='text-start '>Adjust Reason<span className='text-red-900 font-bold text-xl'>*</span></label>
                                <select {...register("adjustReason", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })} className={`input input-sm  focus:outline-0 rounded-sm  border-green-700  lg:w-64 focus:border-blue-500 md:w-36 login-container-input ${errors.adjustReason && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value=''>--Selete Adjust Reason--</option>
                                    <option>Lost</option>
                                    <option>Damaged</option>
                                    <option>Wastage</option>
                                    <option>Expire</option>
                                </select>
                                <label className="label">
                                    {errors.adjustReason?.type === 'required' && <span className="label-text-alt text-red-700">{errors.adjustReason.message}</span>}

                                </label>
                            </div>
                            </div>
                           

                          

                         <div className='lg:flex lg:gap-3'>
                            
                            {/* -----------------------Product Name Field ------------------------------ */}

                            <div className="form-control">
                                <label className='text-start '>Product Name <span className='text-red-900 font-bold text-xl'>*</span></label>
                                <select {...register("productName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })} className={`input input-sm  focus:outline-0 rounded-sm  border-green-700 mt-1  lg:w-52 md:w-48 focus:border-blue-500  login-container-input ${errors.productName && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                    <option value="">--Selete Product Name--</option>
                                    {
                                        products.map((product) => <option>{product.brandName}</option>)
                                    }
                                </select>
                                <label className="label">
                                    {errors.productName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productName.message}</span>}

                                </label>
                            </div>

                            {/* -----------------------Quantity input Field ------------------------------ */}

                            <div className="form-control">
                                <label className='text-start'>Quantity <span className='text-red-900 font-bold text-xl'>*</span></label>
                                <input
                                    type="text"
                                    placeholder='1'
                                    className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-36  focus:border-blue-500  login-container-input ${errors.quantity && 'border-red-600 focus:border-red-600'}`}
                                    {...register("quantity", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fill-Up  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-700">{errors.quantity.message}</span>}

                                </label>
                            </div>

                            {/* -----------------------Price input Field ------------------------------ */}
                            <div className="form-control">
                                <label className='text-start'>Price <span className='text-red-900 font-bold text-xl'>*</span></label>
                                <input
                                    type="text"
                                    placeholder='0'
                                    className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-36  focus:border-blue-500  login-container-input ${errors.price && 'border-red-600 focus:border-red-600'}`}
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fill-Up  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.price?.type === 'required' && <span className="label-text-alt text-red-700">{errors.price.message}</span>}

                                </label>
                            </div>
                            {/* -----------------------Item short notes input Field ------------------------------ */}
                            <div className="form-control">
                                <label className='text-start'>Items Short Notes <span className='text-red-900 font-bold text-xl'>*</span> </label>
                                <input
                                    type="text"
                                    placeholder='Item Note'
                                    className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-64  focus:border-blue-500  login-container-input ${errors.itemsNotes && 'border-red-600 focus:border-red-600'}`}
                                    {...register("itemsNotes", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fill-Up  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.itemsNotes?.type === 'required' && <span className="label-text-alt text-red-700">{errors.itemsNotes.message}</span>}

                                </label>
                            </div>
                         </div>

                        </div>
                        <input className='input btn btn-xs rounded-sm bg-green-700 text-white w-28  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Save' />
                        {/* <button className="btn btn-sm mx-1 bg-gray-600  text-white">
                        <BiRefresh className='text-xl ' /> Reset</button> */}
                        {/* <Link to='/dashboard/stockAdjust' className="btn btn-xs outline-2 mx-1 bg-warning text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white">
                         cancel</Link> */}
                    </form>
                </div>

                <div>

                    <div className='form-control'>
                        <label className='text-start font-bold' >Total Amount</label>
                        <input
                            type="text"
                            placeholder='0'
                            value={totalAmount}
                            className={`input input-sm font-bold max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-36  focus:border-blue-500  login-container-input `}
                        
                        />
                        <button className='input btn btn-xs rounded-sm mt-4 bg-green-700 text-white lg:w-36  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white '>Submit</button>
                    </div>
                </div>
            </div>

            {/* ------------------ show data ----------------------- */}
            <div className="overflow-x-auto mt-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> SL </th>
                            <th> Product </th>
                            <th> Reason </th>
                            <th>Item Notes </th>
                            <th> Quantity </th>
                            <th> Unit Price </th>
                            <th> Total</th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            stockAdjusts.slice(0).reverse().map((stockAdjust, index) => <tr key={stockAdjust._id}>
                                <td>{index + 1}</td>
                                <td> {stockAdjust.productName} </td>
                                <td>{stockAdjust.adjustReason}</td>
                                <td>{stockAdjust.itemsNotes} </td>
                                <td> {stockAdjust.quantity}</td>
                                <td>{stockAdjust.price} </td>
                                {/* <td>{stockAdjust.totalAmount} </td> */}
                                <td>{totalAmount} </td>
                                <td>
                                    {/* <Link className='btn btn-xs bg-green-500 text-white' to={`/dashboard/supplierEdit/${supplier._id}`}><FaEdit /></Link> */}
                                    <button className='btn btn-xs bg-red-500 text-white' onClick={() => handleDelete(stockAdjust._id)}><AiOutlineDelete /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockAdjustAdd;