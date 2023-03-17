import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PreviewIssue = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [requisitions, setRequisitions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/createRequisition/${id}`)
            .then(res => res.json())
            .then(data => setRequisitions(data))
    }, []);

    //==========Issued Date ==============
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

    // ---- For Issued Requisition ------------------- 
    const handleIsIssued =(id)=>{
        const newData = {
            isIssued: "Yes",
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
            navigate('/dashboard/requisitionAuthorize');
        })
    };
    // ------For Rejected issue Requisition------------------
    const handleNotify =(id)=>{
        const newData = {
            isIssued: "No",
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
            navigate('/dashboard/requisitionAuthorize');
        })
    };
   
    // --------------For Authorized------------------
    const onSubmit = (data) => {
        const newData = {
          issuedNotes: data.issuedNotes,
          issuedDate: currentDate,
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
                navigate('/dashboard/requisitionIssue');
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

                    <div className='flex justify-start items-center gap-5 mt-2'>
                        <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                        <div>
                            <p> <span className='text-green-900 font-semibold '> App_Note: </span>  {requisitions.approvedNotes } </p>
                            <p> <span className='text-green-900 font-semibold '> Date:</span>   {requisitions.approvedDate}</p>
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
  
                    {/* ----------------------- Authorized Notes Field ------------------ */}
                    <div className="form-control">
                        <label className='text-start'> Issued Notes </label>
                        <input
                            type="text"
                            className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.issuedNotes && 'border-red-600 focus:border-red-600'}`}
                            {...register("issuedNotes", {
                                required: {
                                    value: true,
                                    message: "❌  Please fill out this field"
                                }
                            })}
                        />
                        <label className="label">
                            {errors.issuedNotes?.type === 'required' && <span className="label-text-alt text-red-700">{errors.issuedNotes.message}</span>}
                        </label>
                    </div>

                    <input 
                        onClick={() =>handleIsIssued(id)}
                        className='input btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-green-500 hover:text-white ' 
                        type="submit" value=' Issued' />
                    <input 
                        onClick={()=> handleNotify(id)}
                        className='input btn btn-sm mx-1 bg-red-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-red-500 hover:text-white ' 
                        type="submit" value='Notify ' />
                    
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

export default PreviewIssue;

// export default PreviewIssue;