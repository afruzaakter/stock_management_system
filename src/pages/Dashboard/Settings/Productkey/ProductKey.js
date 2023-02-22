import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { BiRefresh } from 'react-icons/bi';
import { toast } from 'react-toastify';

const ProductKey = () => {
    const [productkeys, setProductkeys] = useState([]);
    const [deleteID, setDeleteID] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/productkey')
            .then(res => res.json())
            .then(data => setProductkeys(data))
    }, [])
    const handleDelete = (id) => {
            const url = `http://localhost:5000/productkey/${id}`
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = productkeys.filter(productkey => productkey._id !== id);
                    setProductkeys(remaining);
                    setDeleteID('');
                    toast.success('Data was Deleted Successfully!');
                })
        

    }
    return (
        <div className='border  p-1 rounded-lg m-6'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Product Key</h1>
                </div>

            </div>

            <div className='mb-2 flex justify-between '>
                <div>

                    <Link to="/dashboard/productKeyAdd" className='btn btn-sm mx-1 bg-green-700 hover:bg-gray-600 text-white'><FaPlus />  Add Product Key</Link>

                </div>

            </div>


            <div className="overflow-x-auto">
                <table className="table w-96">
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Product Key Code</th>
                            <th>Description </th>
                            <th>Key Type</th>
                            <th>Is System </th>
                            <th>Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            productkeys.map((productkey, index) =>
                                <tr key={productkey._id}>
                                    <th>{index + 1}</th>
                                    <td>{productkey.productkey}</td>
                                    <td>{productkey.description}</td>
                                    <td>{productkey.keytype}</td>
                                    <td>No</td>
                                    <td>

                                        <Link to={`/dashboard/productKeyEdit/${productkey._id}`} className="btn btn-xs mx-1 bg-success text-white">
                                            <FiEdit /> </Link>
                                        <label htmlFor="my-modal-6" className="btn btn-xs bg-red-500 text-white"
                                            onClick={() => setDeleteID(productkey._id)} >
                                            <AiOutlineDelete />
                                        </label>

                                        {/* -------- delete modal ----------------- */}
                                        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                        <div className="modal modal-bottom justify-around sm:modal-middle ">
                                            <div className="bg-gray-300 p-5 rounded-md shadow-lg lg:max-w-52">
                                                <h3 className="font-bold text-lg text-center">Are you sure you want to delete it?</h3>

                                                <div className="mr-14 modal-action">
                                                    <label htmlFor="my-modal-6" onClick={() => handleDelete(deleteID)}
                                                        className="btn  btn-sm bg-green-600 text-white rounded-md">ok</label>
                                                    <label htmlFor="my-modal-6" className="btn btn-sm bg-red-600 rounded-md justify-start text-white">Cancel</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* -------- delete modal ----------------- */}
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

export default ProductKey;