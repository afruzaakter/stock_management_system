import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BudgetCodeEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const {id} = useParams();

//   ------------ update  show data  method---------
const [budgetCodes, setBudgetCodes] = useState([])
   useEffect(() =>{
    const url = `http://localhost:5000/budgetcode/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(data => setBudgetCodes(data))
   }, [])

   console.log(budgetCodes)
    const onSubmit = (data) =>{
        const budgetCode = data.budgetCode ==="" ? budgetCodes.budgetCode : data.budgetCode;
        const updateData ={
            budgetCode,
        };
       const url = `http://localhost:5000/budgetcode/${id}`
       fetch(url,{
        method: 'PUT',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(updateData)
       })
       .then(res => res.json())
       .then(data =>{
        console.log('budget', data)
        toast.success('Data Update Successfully!!!')
        reset()
       })
       navigate('/dashboard/budgetCode')
    }


    return (
        <div className="card w-96 bg-gray-300 mt-28 ml-16">
        <div className='card-body'>
            <h2 className="text-center text-xl font-bold">Update Budget Code</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* -----------------------Key type Field ------------------------------ */}

                <div className="form-control">
                    <input
                        type="text"
                        Value={budgetCodes.budgetCode}
                        className={`input font-bold max-w-xs  focus:outline-0 rounded-sm border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.budgetCode && 'border-red-600 focus:border-red-600'}`}
                        {...register("budgetCode")}
                    />
                    <label className="label">
                        {errors.budgetCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.budgetCode.message}</span>}

                    </label>
                </div>
                <div className='flex justify-between'>
                <input className='input focus:outline-0 input-bordered input-primary  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Update' />
                <Link to="/dashboard/budgetCode" className='btn btn-success btn-outline'>Back</Link>
                </div>
            </form>

        </div>

      
    </div>
    );
};

export default BudgetCodeEdit;