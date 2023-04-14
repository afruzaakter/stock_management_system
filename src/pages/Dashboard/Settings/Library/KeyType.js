import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';


const KeyType = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updated, setUpdated] = useState(false);
    const [deleteID, setDeleteID] = useState('');

    // -------------get method ----------------
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/key')
            .then(res => res.json())
            .then(data => setKeys(data))
    }, [updated]);

    // const uniqueData = keys.filter((value, id) => {
    //     return keys.indexOf(value) === id;
    // })

    // console.log("uniquedata", uniqueData)


    // ------------ data post method  start --------------
    const onSubmit = async (data) => {
        const url = 'https://stock-management-system-server.vercel.app/key'
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
        const url = `https://stock-management-system-server.vercel.app/key/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const remaining = keys.filter(key => key._id !== id)
                setKeys(remaining);
                setDeleteID('');
                toast.success('Data was Deleted Successfully!');
            })


    }

    return (
        <div className='lg:flex lg:justify-start lg:ml-28 lg:items-start mt-28 lg:gap-20'>
            <div className="card w-96 bg-gray-200 ">
                <div className='card-body'>
                    <h2 className="text-center text-xl font-bold">Key Type</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* -----------------------Key type Field ------------------------------ */}

                        <div className="form-control">
                            <input
                                type="text"
                                placeholder='Key Type'
                                className={`input font-bold max-w-xs  focus:outline-0 rounded-sm border-primary mt-1  w-full focus:border-blue-500  login-container-input ${errors.key && 'border-red-600 focus:border-red-600'}`}
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


            </div>


            <div className="overflow-x-auto lg:w-96  ">
                <table className="table w-full ">
                    {/* <!-- head --> */}
                    <thead >
                        <tr>
                            <th className='bg-green-200 '>SL No.</th>
                            <th className='bg-green-200 '>Key Type</th>
                            <th className='bg-green-200 '>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}

                        {
                            keys?.slice(0).reverse().map((key, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{key.key}</td>
                                    <td className='flex gap-1'>
                                        <Link className='btn btn-xs bg-green-500 text-white' to={`/dashboard/keyEdit/${key._id}`}><FaEdit /></Link>
                                        <label htmlFor="my-modal-6" className="btn btn-xs bg-red-500 text-white"
                                            onClick={() => setDeleteID(key._id)} >
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

export default KeyType;