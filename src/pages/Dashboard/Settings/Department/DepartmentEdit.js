import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DepartmentEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const {id} = useParams();
    const [departments, setDepartments] = useState([])
// --------------update show method-----
    useEffect(() => {
        const url = `http://localhost:5000/department/${id}`
          console.log("department id",url);
        fetch(url)
            .then(res => res.json())
            .then(data => setDepartments(data))
    }, []);
    const onSubmit = (data) =>{
        const url = `http://localhost:5000/department/${id}`;

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
        navigate('/dashboard/department')
    }
    return (
        <div className='m-10'>
        <h1 className='text-2xl font-bold'>Update Department</h1>
        <div>
        <form onSubmit={handleSubmit(onSubmit)} >
                  <div className='flex gap-5'>
                      {/* -----------------------Department Name Field ------------------------------ */}

                      <div className="form-control">
                        <label className='text-start '>Department Name</label>
                        <input
                            type="text"
                            Value={departments.name}
                            className={`input font-bold max-w-xs border border-green-700 focus:outline-0 rounded-sm border-gray-400 mt-1  w-96  focus:border-blue-500  login-container-input ${errors.name && 'border-red-600 focus:border-red-600'}`}
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
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
                            Value={departments.description}
                           
                            className={`input font-bold max-w-xs text-red-900  border-green-700  focus:outline-0 rounded-sm  mt-1  w-96 focus:border-blue-500  login-container-input ${errors.description && 'border-red-600 focus:border-red-600'}`}
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
                        <label className='text-start'>Show Order</label>
                        <input
                            type="number"
                            Value={departments.order}
                            className={`input font-bold max-w-xs border-green-700 focus:outline-0 rounded-sm border-gray-400 mt-1  w-96 focus:border-blue-500  login-container-input ${errors.order && 'border-red-600 focus:border-red-600'}`}
                            {...register("order", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.order?.type === 'required' && <span className="label-text-alt text-red-700">{errors.order.message}</span>}

                        </label>
                    </div> 
                  </div>  

                  <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit"  value='◲ Update' />
                  
                   <Link to='/dashboard/department' className="btn btn-sm mx-1 bg-warning text-white">
                 cancel</Link>
                   
                   
                </form>
        </div>
    </div>
    );
};

export default DepartmentEdit;