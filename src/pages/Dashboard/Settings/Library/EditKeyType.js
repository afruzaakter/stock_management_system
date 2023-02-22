import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditKeyType = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const {id} = useParams();

       // -------------------- Update show data method ----------------
       const [keyTypes, setKeyTypes] = useState([])
    //    console.log(keyTypes)
       useEffect(()=>{
        const url = `http://localhost:5000/key/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setKeyTypes(data))
    
       }, [])
      //------------ Update Data--------------- 
    const onSubmit = (data) =>{
        const key = data.key ==="" ? keyTypes.key : data.key ;
        const updateData = {
           key
        }
    
     const url = `http://localhost:5000/key/${id}`
     fetch(url, {
        method: 'PUT',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(updateData)
     })
     .then(res =>res.json())
     .then(data =>{
        toast.success(' Data Update Successfully !!!')
        reset();
     })
     navigate('/dashboard/keyType')
    }
    return (
        <div className="card w-96 bg-gray-300 mt-28 ml-16">
                <div className='card-body'>
                    <h2 className="text-center text-xl font-bold">Key Type</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* -----------------------Key type Field ------------------------------ */}

                        <div className="form-control">
                            <input
                                type="text"
                                Value={keyTypes.key}
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-sm border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.key && 'border-red-600 focus:border-red-600'}`}
                                {...register("key")}
                            />
                            <label className="label">
                                {errors.key?.type === 'required' && <span className="label-text-alt text-red-700">{errors.key.message}</span>}

                            </label>
                        </div>
                        <div className='flex justify-between'>
                        <input className='input focus:outline-0 input-bordered input-primary  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Update' />
                        <Link to="/dashboard/keyType" className='btn btn-success btn-outline'>Back</Link>
                        </div>
                    </form>

                </div>

              
            </div>

    );
};

export default EditKeyType;