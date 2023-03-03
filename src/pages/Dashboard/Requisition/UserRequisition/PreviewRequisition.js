import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PreviewRequisition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [requisitions, setRequisitions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/createRequisition/${id}`)
            .then(res => res.json())
            .then(data => setRequisitions(data))
    }, [])

    const handleReqDelete = (id) => {
        console.log(id)
        const url = `http://localhost:5000/createRequisition/${id}`
        fetch(url,{
            method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            navigate('/dashboard/requisition')
        })
    }

    return (
        <div className='m-4 '>
            <h2 className='text-xl font-bold ml-4'> Requisition Serial: {requisitions?.autoCode}</h2>
            <div className='flex justify-between items-center  rounded-l-md '>
                <div className='flex justify-start items-center gap-5 mt-4'>
                    <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                    <div>
                        <p> <span className='text-primary font-semibold '> User_Note: </span>  {requisitions.requisitionNotes} </p>
                        <p> <span className='text-primary font-semibold '> Date:</span>   {requisitions.date}</p>
                    </div>
                </div>
                <div >
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

export default PreviewRequisition;