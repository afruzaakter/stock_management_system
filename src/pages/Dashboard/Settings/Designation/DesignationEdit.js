import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DesignationEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const {id} = useParams();
        // -------------------- Update show data method ----------------
        const [designations, setDesignations] = useState([])
         
        useEffect(()=>{
            const url = `https://stockmanagementsystemserver-production.up.railway.app/designation/${id}`
            fetch(url)
            .then(res=>res.json())
            .then(data=>setDesignations(data))
        }, [])
        console.log(designations)
         
        const onSubmit = (data) =>{
            const name = data.name ==="" ? designations.name : data.name;
            const description = data.description ==="" ? designations.description : data.description;
            const order = data.order ==="" ? designations.order : data.order;
            const updateData = {
                name,
                description,
                order
            }
            const url = `https://stockmanagementsystemserver-production.up.railway.app/designation/${id}`;
            fetch(url, {
                method: 'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateData)
            })
            .then(res =>res.json())
            .then(data =>{
                console.log('success', data)
                toast.success(' Data Update Successfully !!!')
                reset();
            })
        navigate('/dashboard/designation');
    }
    return (
        <div className='m-10'>
        <h1 className='lg:text-2xl font-bold'>Update Designation</h1>
        <div className='mt-5'>
        <form onSubmit={handleSubmit(onSubmit)} >
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {/* -----------------------Department Name Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Designation Name</label>
                        <input
                            type="text"
                            Value={designations.name}
                            className={`input input-sm max-w-xs border border-green-700 focus:outline-0 rounded-sm mt-1  lg:w-96  focus:border-blue-500  login-container-input ${errors.name && 'border-red-600 focus:border-red-600'}`}
                            {...register("name")}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-700">{errors.name.message}</span>}

                        </label>
                    </div>  

                       
                    {/* -----------------------Department Name Field ------------------------------ */}

                    <div className="form-control">
                        <label className='text-start '>Description</label>
                        <textarea
                            type="text"
                            Value={designations.description}
                           
                            className={`input input-sm max-w-xs text-red-900  border-green-700  focus:outline-0 rounded-sm  mt-1  lg:w-96 focus:border-blue-500  login-container-input ${errors.description && 'border-red-600 focus:border-red-600'}`}
                            {...register("description")}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' && <span className="label-text-alt text-red-700">{errors.description.message}</span>}

                        </label>
                    </div> 
                    {/* -----------------------Department Name Field ------------------------------ */}

                    <div className="form-control">
                        <label className='text-start'>Show Order</label>
                        <input
                            type="number"
                            Value={designations.order}
                            className={`input input-sm max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-96 focus:border-blue-500  login-container-input ${errors.order && 'border-red-600 focus:border-red-600'}`}
                            {...register("order")}
                        />
                        <label className="label">
                            {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}

                        </label>
                    </div> 
                  </div>  

                  <input className='input  btn btn-sm rounded-md px-4 mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit"  value='◲ Update' />
                   
                   <Link to='/dashboard/designation' className="btn btn-sm font-bold rounded-md  mx-1 px-6 bg-red-600  text-white hover:bg-gray-700  "><RxCross2/>
                 Back</Link>
                   
                   
                </form>
        </div>
    </div>
    );
};

export default DesignationEdit;