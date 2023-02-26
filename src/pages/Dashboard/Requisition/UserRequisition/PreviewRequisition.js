import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

const PreviewRequisition = () => {
    const { id } = useParams();
    const [requisitions, setRequisitions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/createRequisition/${id}`)
            .then(res => res.json())
            .then(data => setRequisitions(data))
    }, [])

    
    const TableRow = ({ productName, productQuantity }) => {
        return (
            <tr>
                <td>{productName}</td>
                <td>{productQuantity}</td>
            </tr>
        );
    };


    
    
    return (
        <div className='m-4 '>
            <h2 className='text-xl font-bold ml-4'> {requisitions?.autoCode} || Requisition  Date:{requisitions?.date}</h2>
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
                    <button className="btn btn-xs rounded-md  text-red-600 mx-1 border-red-600">❌ Delete</button>
                    
                    <Link to={`/dashboard/requisition`} className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600">
                         Back 
                    </Link>
                </div>
            </div>

            <div>
                <div className='flex justify-between mt-5'>
                    <h2 className='text-md ml-4  '>Requisition No. R00071 </h2>
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
                                    Object.entries(requisitions)
                                    .filter(([key, value]) => key.split(' ')[0] === 'productName')
                                    .map(([key, value], index) => (
                                        
                                        <TableRow productName={requisitions[`productName ${index+1}`]} productQuantity={requisitions[`productQuantity ${index+1}`]} />
                                       
                                    ))
                                }

                                {/* {
                                    ('autoCode' ||'email' ||'date' ||'requisitionNotes' || '_id') 
                                    .filter(([key, value]) => key !== 'email')


                                    totalProduct.map((product,index) => (
                                        <tr key={index}>
                                            <td>{product.props.productName}</td>
                                            <td>{product.props.productQuantity}</td>
                                        </tr>

                                        
                                    ))
                                } */}


                                {/* {
                                    Object.entries(requisitions).map(([key, value], index) => (

                                        // <TableRow key={key}
                                        //     productName={requisitions[key]}
                                        //     productQuantity={requisitions[value]} />
                                        
                                    ))
                                } */}


                                {/* {
                                    totalProduct.map((product , index) => ( 
                                        <>
                                        
                                        <TableRow productName={requisitions[`productName ${index+1}`]} productQuantity={requisitions[`productQuantity ${index+1}`]} />
                                        </>

                                    ))
                                } */}



                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewRequisition;