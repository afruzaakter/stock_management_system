import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';

const StockAdjustAdd = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const [ deleteID, setDeleteID] = useState('')
    const {id} = useParams()
    //------------- product brand name dropdown show data ---------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://stockmanagementsystemserver-production.up.railway.app/product')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])
  
    //------------- stock adjust data get method ---------
    const [stockAdjusts, setStockAdjusts] = useState([]);
    useEffect(() => {
        fetch('https://stockmanagementsystemserver-production.up.railway.app/stockadjust')
            .then(res => res.json())
            .then(data => setStockAdjusts(data));
    }, [updated])
  
        
        
    const onSubmit = (data) => {
        const quantity = data.quantity;
        const price = data.price;
        const total = quantity * price;
         const updateData = {
            date:data.date,
            notes:data.notes,
            adjustReason:data.adjustReason,
            productName: data.productName,
            quantity : data.quantity,
            price :data.price,
            itemsNotes: data.itemsNotes,
            total: total
         }
        console.log("total",total)
        // console.log(quantity)
        const url = 'https://stockmanagementsystemserver-production.up.railway.app/stockadjust'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(updateData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("update data",data)
                toast.success("Data Added Successfully!!!");
                setUpdated(!updated)
                reset();
            })
        //   navigate('/dashboard/productKey');
    }

    const handleDelete = (id) => {
            const url = `https://stockmanagementsystemserver-production.up.railway.app/stockadjust/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remaining = stockAdjusts.filter(stockAdjust => stockAdjust._id !== id)
                    setStockAdjusts(remaining);
                    setDeleteID(' ');
                    toast.success('Data was Deleted Successfully!');
                })
        
    }

    
   //---------------- Calculation for totalAmount-------------
    const singleAmount = stockAdjusts.map(stockAdjust => stockAdjust.total);
    // console.log(singleAmount)
    let sum = 0;
    for (let i = 0; i < singleAmount.length; i++) {
        sum += singleAmount[i];    
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
                                        products.map((product) => <option>{product.productName}</option>)
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
                            {/* -----------------------Price input Field ------------------------------ */}
                            {/* <div className="form-control">
                                <label className='text-start'>Total <span className='text-red-900 font-bold text-xl'>*</span></label>
                                <input
                                    type="text"
                                    placeholder='0'
                                    value = {total}
                                    className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-36  focus:border-blue-500  login-container-input ${errors.price && 'border-red-600 focus:border-red-600'}`}
                                    {...register("total", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fill-Up  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.price?.type === 'required' && <span className="label-text-alt text-red-700">{errors.price.message}</span>}

                                </label>
                            </div> */}
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
                        <input className='input  input-sm rounded-md bg-green-700 text-white px-6 max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Submit' />
                       
                        <Link to='/dashboard/stockAdjust' className="btn bg-red-600 px-6 rounded-md btn-sm  outline-2 mx-1  text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white">
                        <RxCross2/> cancel</Link>
                    </form>
                </div>

                <div>

                    <div className='form-control'>
                        <label className='text-start font-bold' >Total Amount</label>
                        <input
                            type="text"
                            value={sum}                          
                            className={`input input-sm font-bold max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1 lg:w-36  focus:border-blue-500  login-container-input `}
                        
                        />
                      
                        <button className='input input-sm rounded-md mt-4 bg-green-700 text-white lg:w-36  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white '>Submit</button>
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
                                <td>{stockAdjust.total} </td>
                                
                                <td>
                                    <Link className='btn btn-xs bg-green-500 text-white' to={`/dashboard/supplierEdit/${stockAdjust._id}`}><FaEdit /></Link>
                                    <label htmlFor="my-modal-6" className="btn btn-xs bg-red-500 text-white"
                                            onClick={() =>setDeleteID(stockAdjust._id) } >
                                            <AiOutlineDelete />
                                        </label>

                                     {/* -------- delete modal ----------------- */}
                                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                        <div className="modal modal-bottom justify-around sm:modal-middle ">
                                            <div className="bg-gray-300 p-5 rounded-md shadow-lg lg:max-w-52">
                                                <h3 className="font-bold text-lg text-center">Are you sure you want to delete it?</h3>

                                                <div className="mr-14 modal-action">
                                                    <label htmlFor="my-modal-6" onClick={() =>handleDelete(deleteID)}
                                                        className="btn  btn-sm bg-green-600 text-white rounded-md">ok</label>
                                                    <label htmlFor="my-modal-6" className="btn btn-sm bg-red-600 rounded-md justify-start text-white">Cancel</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* -------- delete modal ----------------- */} 
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