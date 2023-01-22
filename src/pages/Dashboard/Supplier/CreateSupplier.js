import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { useEffect } from 'react';
const CreateSupplier = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false); 
    const navigate = useNavigate();
    
    //------- for auto generate code 
    const [autoCode, setAutoCode] = useState(); 
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
       const url = `http://localhost:5000/supplier`
       fetch(url)
           .then(res => res.json())
           .then(data => setSuppliers(data))
   }, []);

   const Counter=()=>{
        const code=suppliers.code;
        setAutoCode(code+1);
        console.log("update code", autoCode);
   }


    //-------- Suppler Post mehton-----------
    const onSubmit =(data)=>{
        console.log(data);
        const url = "http://localhost:5000/supplier"
        fetch(url, {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            'Content-type' : 'application/json; charset=UTF-8', 
         },
        })
        .then(res => res.json())
        .then(data =>{
        //  console.log(data)
         toast.success('Data added Successfully!!!');
         setUpdated(!updated)
         reset();
        })
        navigate('/dashboard/supplier');
    }
    return (
        <div className='m-10  '>
       
        <div>
        <h1 className='text-2xl  mb-5'>Create Supplier</h1>
        <form onSubmit={handleSubmit(onSubmit)} >
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {/* -----------------------Supplier Company Name Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Name (Company,Distributor,Dealer)</label>
                        <input
                            type="text"
                            placeholder='Supplier Name'
                            className={`input input-sm  max-w-xs border border-green-800 focus:outline-0 rounded-sm    w-full  focus:border-blue-800  login-container-input ${errors.suppliercompany && 'border-red-600 focus:border-red-600'}`}
                            {...register("suppliercompany", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fill-Up  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.suppliercompany?.type === 'required' && <span className="label-text-alt text-red-700">{errors.suppliercompany.message}</span>}

                        </label>
                    </div>   
                   
                    {/* -----------------------Supplier Code Field ------------------------------ */}

                    <div className="form-control">
                        <label className='text-start'>Code</label>
                        <input
                            type="text"
                            value= {autoCode}
                            placeholder='Code'
                            className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm    w-full focus:border-blue-500  login-container-input ${errors.code && 'border-red-600 focus:border-red-600'}`}
                            {...register("code", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fill-Up  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.code?.type === 'required' && <span className="label-text-alt text-red-700">{errors.code.message}</span>}

                        </label>
                    </div> 
                    {/* -----------------------Supplier Email Field ------------------------------ */}

                    <div className="form-control">
                        <label className='text-start w'>Email</label>
                        <input
                            type="email"
                            placeholder='E-mail'
                            className={`input input-sm  w-full max-w-xs border-green-700 focus:outline-0 rounded-sm    focus:border-blue-500  login-container-input ${errors.email && 'border-red-600 focus:border-red-600'}`}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "❌ Email is Required"
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: '❌ Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}

                        </label>
                    </div> 
                 
                  
                      {/* -----------------------Supplier Contact Person Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Contact Person</label>
                        <input
                            type="text"
                            placeholder='Contact Person'
                            className={`input input-sm  w-full max-w-xs border-green-700 focus:outline-0 rounded-sm    focus:border-blue-500  login-container-input ${errors.contactPerson && 'border-red-600 focus:border-red-600'}`}
                            {...register("contactPerson", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fill-Up  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.contactPerson?.type === 'required' && <span className="label-text-alt text-red-700">{errors.contactPerson.message}</span>}

                        </label>
                    </div> 
                      {/* -----------------------Supplier Contact Number Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Contact Number</label>
                        <input
                            type="phone"
                            placeholder='01✕✕✕✕✕✕✕✕'
                            className={`input input-sm  w-full max-w-xs border-green-700 focus:outline-0 rounded-sm    focus:border-blue-500  login-container-input ${errors.contactNumber && 'border-red-600 focus:border-red-600'}`}
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fill-Up  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.contactNumber?.type === 'required' && <span className="label-text-alt text-red-700">{errors.contactNumber.message}</span>}

                        </label>
                    </div> 
                      {/* -----------------------Supplier Address Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Address</label>
                        <input
                            type="text"
                            placeholder='Address'
                            className={`input input-sm  w-full max-w-xs border-green-700 border-bold focus:outline-0 rounded-sm    focus:border-blue-500  login-container-input ${errors.address && 'border-red-600 focus:border-red-600'}`}
                            {...register("address", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fill-Up  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.address?.type === 'required' && <span className="label-text-alt text-red-700">{errors.address.message}</span>}

                        </label>
                    </div> 

                  </div>

                  <input 
                    onClick={()=> Counter()}
                    className=' rounded-md px-6 btn btn-sm 
                   mx-1 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit"  value='◲ Submit' />
                  
                   <Link to='/dashboard/supplier' className="btn outline-2 mx-1 bg-red-600 px-6  rounded-md btn-sm  text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white"><RxCross2/>
                 cancel</Link>       
                </form>
        </div>
    </div>
    );
};

export default CreateSupplier;