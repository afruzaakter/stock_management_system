import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BudgetCode = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const [budgetCodes, setBudgetCodes] = useState([]);
    // ----------- Budget code get method ------------
    useEffect(()=>{
        fetch('http://localhost:5000/budgetcode')
        .then(res=> res.json())
        .then(data=> setBudgetCodes(data))
    },[updated])
    // ----------- Budget code post/create method ------------
    const onSubmit = (data) =>{
       const url = 'http://localhost:5000/budgetcode'
       fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
       })
       .then(res=>res.json())
       .then(data=>{
        if(data.insertedId){
            toast.success('Data Add Successfully!!!')
            setUpdated(!updated)
            reset();
        }
        else{
            toast.error('Fail Add Data !!!')
        }
       })
    }
    const handleDelete = (id) =>{
      const proceed = window.confirm("Are you Sure")
      if(proceed){
        const url = `http://localhost:5000/budgetcode/${id}`
        fetch(url,{
            method: 'DELETE'         
        })
        .then(res => res.json())
        .then(data =>{
            const remaining = budgetCodes.filter(budgetCode => budgetCode._id !== id)
            setBudgetCodes(remaining);
        })
      }
    }
    return (
        <div className='lg:flex   lg:ml-10 lg:items-start justify-around mt-28 lg:gap-10'>
        <div className="card w-96 bg-gray-200 ">
            <div className='card-body'>
                <h2 className="text-center text-xl font-bold">Budget Code</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* -----------------------Key type Field ------------------------------ */}

                    <div className="form-control">
                        <input
                            type="text"
                            placeholder='Budget Code'
                            className={`input font-bold max-w-xs  focus:outline-0 rounded-sm border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.budgetCode && 'border-red-600 focus:border-red-600'}`}
                            {...register("budgetCode", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.budgetCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.budgetCode.message}</span>}

                        </label>
                    </div>
                    <input className='input focus:outline-0 input-bordered input-primary w-full max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Submit' />
                </form>

            </div>

          
        </div>


        <div className="overflow-x-auto lg:w-3/3  ">
            <table className="table w-full ">
                {/* <!-- head --> */}
                <thead >
                    <tr>
                        <th className='bg-green-200 '>SL.</th>
                        <th className='bg-green-200 '>Budget Code</th>
                        <th className='bg-green-200 '>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}

                    {
                        budgetCodes?.slice(0).reverse().map((budgetCode, index) =>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{budgetCode.budgetCode}</td>
                                <td className='flex gap-1'>
                                    <Link className='btn btn-sm bg-green-500 text-white' to={`/dashboard/budgetCodeEdit/${budgetCode._id}`}><FaEdit /></Link>
                                    <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(budgetCode._id)}><MdDeleteForever /></button>
                                </td>


                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default BudgetCode;