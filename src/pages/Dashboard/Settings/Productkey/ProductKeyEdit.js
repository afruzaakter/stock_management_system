import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const ProductKeyEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const {id} = useParams();
    const navigate = useNavigate()
    // -------- key type get method------------
    const [keys, setKeys] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:5000/key')
        .then(res=>res.json())
        .then(data =>setKeys(data))
    },[])

    const [productkeys, setProductkeys] = useState([]);
    console.log(productkeys)

    useEffect(() =>{
        const url = `http://localhost:5000/productkey/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data =>setProductkeys(data))
    },[])
   
    const onSubmit = (data) =>{
     const url = `http://localhost:5000/productkey/${id}`
     fetch(url,{
        method: 'PUT',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then(data =>{
        toast.success('Data Update Successfully!!!');
        reset();
     })
    navigate('/dashboard/productKey');
    }
    return (
        <div className='m-10'>
        <h1 className='text-2xl font-bold'>Update Product Key</h1>
        <div>
        <form onSubmit={handleSubmit(onSubmit)} >
                  <div className='flex gap-5'>
                      {/* -----------------------Department Name Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Product key Code</label>
                        <input
                            type="text"
                            Value={productkeys.productkey}
                            className={`input font-bold max-w-xs border border-green-700 focus:outline-0 rounded-sm border-gray-400 mt-1  w-96  focus:border-blue-500  login-container-input ${errors.productkey && 'border-red-600 focus:border-red-600'}`}
                            {...register("productkey", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.productkey?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productkey.message}</span>}

                        </label>
                    </div>   
                    {/* -----------------------Department Name Field ------------------------------ */}

                    <div className="form-control">
                        <label className='text-start '>Description</label>
                        <textarea
                            type="text"
                            Value={productkeys.description}
                            className={`input font-bold max-w-xs  border-green-700  focus:outline-0 rounded-sm border-gray-400 mt-1  w-96 focus:border-blue-500  login-container-input ${errors.description && 'border-red-600 focus:border-red-600'}`}
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
                        <label className='text-start'>Key Type</label>
                        <select  {...register("keytype")}
                         Value={productkeys.keytype} 
                            className={`input font-bold w-64  focus:outline-0 rounded-sm  border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.opportunity  && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                {/* <option value='' >--Select key type--</option> */}
                            {
                                keys.map((key)=><option>{key.key}</option>)
                            }
                        </select>
                     
                        <label className="label">
                            {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}

                        </label>
                    </div> 
                  </div>  

                  <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit"  value='◲ Update' />
                   {/* <button className="btn btn-sm mx-1 bg-gray-600  text-white">
                 <BiRefresh className='text-xl ' /> Reset</button> */}
                   <Link to='/dashboard/productKey' className="btn btn-sm mx-1 bg-warning text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white"><RxCross2/>
                 cancle</Link>
                   
                   
                </form>
        </div>
    </div>
    );
};

export default ProductKeyEdit;