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
    
    //===========for auto generate code ========
    const [suppliers, setSuppliers] = useState([]);
    const [autoCode, setAutoCode] = useState(); 
   
    useEffect(() => {
       const url = `https://stockmanagementsystemserver-production.up.railway.app/supplier`
       fetch(url)
           .then(res => res.json())
           .then(data => setSuppliers(data))
   }, []);
   useEffect(() => {
        const codeList = suppliers?.map(supplier => supplier.autoCode);
        const length =codeList.length; 
        if(length === 0){
            setAutoCode(1001)
        }else{
            const lastValue =codeList[length-1]; 
            const lastCode = +lastValue;
            setAutoCode(lastCode+1)
        }
   }, [suppliers]);

    //-------- Suppler Post method -----------
    const onSubmit =(data)=>{

        const updateData={
            supplierCompany: data.supplierCompany,
            autoCode: autoCode ,
            email: data.email ,
            contactPerson: data.contactPerson ,
            contactNumber: data.contactNumber ,
            address: data.address ,
        }

        console.log(data);
        const url = "https://stockmanagementsystemserver-production.up.railway.app/supplier"
        fetch(url, {
         method: "POST",
         body: JSON.stringify(updateData),
         headers: {
            'Content-type' : 'application/json; charset=UTF-8', 
         },
        })
        .then(res => res.json())
        .then(data =>{
         console.log(data)
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
                            className={`input input-sm  max-w-xs border border-green-800 focus:outline-0 rounded-sm    w-full  focus:border-blue-800  login-container-input ${errors.supplierCompany && 'border-red-600 focus:border-red-600'}`}
                            {...register("supplierCompany", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fill-Up  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.supplierCompany?.type === 'required' && <span className="label-text-alt text-red-700">{errors.supplierCompany.message}</span>}

                        </label>
                    </div>   
                   
                    {/* -----------------------Supplier Code Field ------------------------------ */}

                    {/* <div className="form-control">
                        <label className='text-start'>Supplier Id</label>
                        <input
                            type="text"
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
                    </div>  */}
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

                  <input  className="rounded-md px-6 btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white " type="submit"  value='◲ Submit' />
                  
                   <Link to='/dashboard/supplier' className="btn outline-2 mx-1 bg-red-600 px-6  rounded-md btn-sm  text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white"><RxCross2/>
                 cancel</Link>       
                </form>
        </div>
    </div>
    );
};

export default CreateSupplier;