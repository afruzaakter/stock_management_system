import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const ProductAddKey = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate();
 
    const [keys, setKeys] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:5000/key')
        .then(res=>res.json())
        .then(data =>setKeys(data))
    },[])

    const onSubmit = (data) =>{
      const url = 'http://localhost:5000/productkey'
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        toast.success("Data Added Successfully!!!");
        reset();
      })
      navigate('/dashboard/productKey');
    }

   


    return (
        <div className='m-10'>
        <h1 className='text-2xl font-bold'>Create Product Key</h1>
        <div>
        <form onSubmit={handleSubmit(onSubmit)} >
                  <div className='flex gap-5'>
                      {/* -----------------------Department Name Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Product key Code</label>
                        <input
                            type="text"
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
                        <select   {...register("keytype", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                            className={`input font-bold w-64  focus:outline-0 rounded-sm  border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.opportunity  && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select key type--</option>
                            {
                                keys.map((key)=><option>{key.key}</option>)
                            }
                        </select>
                     
                        <label className="label">
                            {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}

                        </label>
                    </div> 
                  </div>  

                  <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit"  value='◲ Save' />
                   {/* <button className="btn btn-sm mx-1 bg-gray-600  text-white">
                 <BiRefresh className='text-xl ' /> Reset</button> */}
                   <Link to='/dashboard/productKey' className="btn btn-sm mx-1 bg-warning text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white"><RxCross2/>
                 cancle</Link>
                   
                   
                </form>
        </div>
    </div>
    );
};

export default ProductAddKey;