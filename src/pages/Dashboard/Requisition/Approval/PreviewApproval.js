import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
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
    }, [])

    // for requisition delete
    const handleReqDelete = (id) => {
        const url = `http://localhost:5000/createRequisition/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                navigate('/dashboard/requisition')
            })
    }

    // --------------For Authorized------------------
    const onSubmit = (data) => {
        const newData = {
            autoCode: requisitions.autoCode,
            email: requisitions.email,
            date: requisitions.date,
            products: requisitions.products,
            requisitionNotes: requisitions.requisitionNotes,

            authorizeNotes: requisitions.authorizeNotes,
            isAuthorized: requisitions.isAuthorized,

            approvedNotes: data.approvedNotes,
            isApproved: data.isApproved,
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

            <div className='flex justify-between items-center border-b-2 rounded-l-md p-5'>
                <div>
                    <div className='flex justify-start items-center gap-5 mt-4'>
                        <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                        <div>
                            <p className='text-blue-600'>Requisition Created:{requisitions.requisitionNotes} </p>
                            <p> {requisitions?.date} </p>
                        </div>
                    </div>
                    <div className='flex justify-start items-center gap-5 mt-4'>
                        <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                        <div>
                            <p className='text-blue-600'>Requisition Authorized: {requisitions.authorizeNotes} </p>
                            <p> {requisitions?.date} </p>
                        </div>
                    </div>
                </div>
                <div >
                    <Link to={`/dashboard`} className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600">
                        <FiEdit /> Edit
                    </Link>

                    <label htmlFor="my-modal-6" className="btn btn-xs rounded-md  text-red-600 mx-1 border-red-600">
                        ❌ Delete
                    </label>


                    <Link to={`/dashboard/requisition`} className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600">
                        Back
                    </Link>

                    {/* -------- delete modal ----------------- */}
                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                    <div className="modal modal-bottom justify-around sm:modal-middle ">
                        <div className="bg-gray-300 p-5 rounded-md shadow-lg lg:max-w-52">
                            <h3 className="font-bold text-lg text-center">Are you sure you want to delete it?</h3>

                            <div className="mr-14 modal-action">
                                <label htmlFor="my-modal-6" onClick={() => handleReqDelete(id)}
                                    className="btn  btn-sm bg-green-600 text-white rounded-md">ok</label>
                                <label htmlFor="my-modal-6" className="btn btn-sm bg-red-600 rounded-md justify-start text-white">Cancel</label>
                            </div>
                        </div>
                    </div>
                    {/* -------- delete modal end----------------- */}

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

            <div>
                <div className='flex justify-between mt-5'>
                    <h2 className='text-md ml-4  '>Requisition No.  </h2>
                    <h2 className='text-md ml-4 '>Requisition Date: {requisitions.date}</h2>
                </div>
                <div>
                    <div className="overflow-x-auto">
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
            </div>
        </div>
    );
};

export default PreviewApproval;