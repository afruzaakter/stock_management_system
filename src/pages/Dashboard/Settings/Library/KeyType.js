import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const KeyType = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);

    // -------------get method ----------------
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/key')
            .then(res => res.json())
            .then(data => setKeys(data))
    }, [updated]);


    // ------------ data post method  start --------------
    const onSubmit = async (data) => {
        const url = 'http://localhost:5000/key'
        console.log(url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data)
                if (data.insertedId) {

                    toast.success("Successfull Data add !!!");
                    setUpdated(!updated)
                    reset()
                }
                else {
                    toast.error("Failed to add product !!!");
                }
            });
    }
    // ------------ data post method  start --------------
    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure?')
        if (proceed) {
            const url = `http://localhost:5000/key/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = keys.filter(key => key._id !== id)
                    setKeys(remaining)
                })
        }

    }

    return (
        <div className='lg:flex lg:justify-start lg:ml-28 lg:items-start mt-16 lg:gap-20'>
            <div className="card w-96 bg-gray-300 ">
                <div className='card-body'>
                    <h2 className="text-center text-xl font-bold">Key Type</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* -----------------------Key type Field ------------------------------ */}

                        <div className="form-control">
                            <input
                                type="text"
                                placeholder='Key Type'
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-sm border-gray-400 mt-1  w-full focus:border-blue-500  login-container-input ${errors.key && 'border-red-600 focus:border-red-600'}`}
                                {...register("key", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.key?.type === 'required' && <span className="label-text-alt text-red-700">{errors.key.message}</span>}

                            </label>
                        </div>
                        <input className='input focus:outline-0 input-bordered input-primary w-full max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='Submit' />
                    </form>

                </div>

                <ToastContainer />
            </div>


            <div className="overflow-x-auto lg:w-96  ">
                <table className="table w-full ">
                    {/* <!-- head --> */}
                    <thead >
                        <tr>
                            <th className='bg-green-300 '>SL No.</th>
                            <th className='bg-green-300 '>Key Type</th>
                            <th className='bg-green-300 '>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            keys?.slice(0).reverse().map((key, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{key.key}</td>
                                    <td className='flex gap-4'>
                                        <Link to={`/dashboard/departmentEdit/${key._id}`}><FaEdit /></Link>
                                        <button onClick={() => handleDelete(key._id)}><MdDeleteForever /></button>
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

export default KeyType;