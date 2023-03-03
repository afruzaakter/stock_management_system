import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PreviewApproval = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [requisitions, setRequisitions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/createRequisition/${id}`)
            .then(res => res.json())
            .then(data => setRequisitions(data))
    }, []);

     //==========Approved Date ==============
     const date = new Date();
     const day = date.getDate();
     const month = date.getMonth();
     const year = date.getFullYear();
     const hours = date.getHours();
     const minutes = date.getMinutes();
     // format the time
     const amOrPm = hours >= 12 ? 'pm' : 'am';
     const twelveHourClock = hours % 12 || 12;
     const currentTime = `${twelveHourClock}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
     // format the date
     const currentDate = day + '-' + month + '-' + year + ' | '+ currentTime;
 

    // --------------For Authorized------------------
    const onSubmit = (data) => {
        const newData = {
          autoCode:requisitions.autoCode,
          email:requisitions.email,
          date:requisitions.date,
          products:requisitions.products,
          requisitionNotes:requisitions.requisitionNotes,

          authorizeNotes: requisitions.authorizeNotes,
          isAuthorized: requisitions.isAuthorized,

          approvedNotes:data.approvedNotes,
          isApproved:data.isApproved,
          approvedDate: currentDate
        };
      
        const url = `http://localhost:5000/createRequisition/${id}`;
        fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        })
          .then((res) => res.json())
          .then((data) => {
            reset(); // assuming this function resets the form data
            navigate('/dashboard/requisitionApproval');
          })
      };

    return (
        <div className='m-4 '>
            <h2 className='text-xl font-bold ml-4'> Requisition Serial: {requisitions?.autoCode}</h2>
            
            <div className='flex justify-between items-center border-b-2 rounded-l-md pb-2'>
                <div>
                    <div className='flex justify-start items-center gap-5 mt-2'>
                        <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                        <div>
                            <p> <span className='text-green-900 font-semibold '> User_Note: </span>  {requisitions.requisitionNotes} </p>
                            <p> <span className='text-green-900 font-semibold '> Date:</span>   {requisitions.date}</p>
                        </div>
                    </div>
                    
                    <div className='flex justify-start items-center gap-5 mt-2'>
                        <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                        <div>
                            <p> <span className='text-green-900 font-semibold '> Auth_Note: </span>  {requisitions.authorizeNotes } </p>
                            <p> <span className='text-green-900 font-semibold '> Date:</span>   {requisitions.AuthorizedDate}</p>
                        </div>
                    </div>
                </div>
                
                <div >
                    <Link to={`/dashboard/requisition`} className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600">
                         Back 
                    </Link>
                </div>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>

                        {/* ----------------------- Authorized Notes Field ------------------ */}
                         <div className="form-control">
                            <label className='text-start'> Approved Notes </label>
                            <input
                                type="text"
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.approvedNotes && 'border-red-600 focus:border-red-600'}`}
                                {...register("approvedNotes", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.approvedNotes?.type === 'required' && <span className="label-text-alt text-red-700">{errors.approvedNotes.message}</span>}
                            </label>
                        </div>

                       {/* ----------------------- Authorization (yes/no) Field -------------- */}
                       <div className="form-control">
                            <label className='text-start'>Approved </label>
                            <select
                                {...register("isApproved", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out this field"
                                    }
                                })}
                                className={`input input-sm w-80  focus:outline-0 rounded-sm border border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.isApproved && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''> Yes </option>
                                <option > Yes </option>
                                <option > No </option>
                            </select>

                            <label className="label">
                                {errors.isApproved?.type === 'required' && <span className="label-text-alt text-red-700">{errors.isApproved.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------    All field end     ------- */}
                    </div>

                    <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Approved' />
                    
                </form>
            </div>

            <div className="overflow-x-auto mt-3">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <td> Product Name</td>
                            <td> Quantity </td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (requisitions.products)?.map((product) => (
                                <tr>
                                    <td>{product.productName}</td>
                                    <td>{product.productQuantity}</td>
                                </tr>
                                
                            ))
                        } 
                    </tbody>
                </table>
            </div>
                
        </div>
    );
};

export default PreviewApproval;