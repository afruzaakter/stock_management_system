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

    
    // const TableRow = ({ productName, productQuantity }) => {
    //     return (
    //         <tr>
    //             <td>{productName}</td>
    //             <td>{productQuantity}</td>
    //         </tr>
    //     );
    // };


    return (
        <div className='m-4 '>
            <h2 className='text-xl font-bold ml-4'> Requisition Serial: {requisitions?.autoCode}</h2>
            <div className='flex justify-between items-center border-b-2 rounded-l-md p-5'>
                <div className='flex justify-start items-center gap-5 mt-4'>
                    <AiOutlineCheck className='font-bold text-2xl text-green-900' />
                    <div>
                        <p className='text-blue-600'>Requisition Created</p>
                        <p>29/01/2023</p>
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
                                {/* Map operation using object */}
                                {/* {
                                    Object.entries(requisitions)
                                    .filter(([key, value]) => key.split(' ')[0] === 'productName')
                                    .map(([key, value], index) => (
                                        
                                        <TableRow productName={requisitions[`productName ${index+1}`]} productQuantity={requisitions[`productQuantity ${index+1}`]} />
                                       
                                    ))
                                } */}

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