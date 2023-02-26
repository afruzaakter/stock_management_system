import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const ProductKeyEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset, Controller } = useForm();
    const { id } = useParams();
    const navigate = useNavigate()
    // -------- key type get method------------
    const [keys, setKeys] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/key')
            .then(res => res.json())
            .then(data => setKeys(data))
    }, [])

    const [productkeys, setProductkeys] = useState([]);


    useEffect(() => {
        const url = `http://localhost:5000/productkey/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setProductkeys(data))
    }, [])

    const onSubmit = (data) => {
        const productkey = data.productkey === "" ? productkeys.productkey : data.productkey;
        const description = data.description === "" ? productkeys.description : data.description;
        const keytype = data.keytype === "" ? productkeys.keytype : data.keytype;
        const updateData = {
            productkey,
            description,
            keytype
        }
        console.log(updateData)
        const url = `http://localhost:5000/productkey/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Data Update Successfully!!!');
                reset();
            })
        navigate('/dashboard/productKey');
    }


    return (
        <div className='m-10'>
            <h1 className='text-2xl '>Update Product Key</h1>
            <div className='mt-5'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='lg:flex lg:gap-5'>
                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start '>Product key Code</label>
                            <input
                                type="text"
                                Value={productkeys.productkey}
                                className={`input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-96  focus:border-blue-500  login-container-input ${errors.productkey && 'border-red-600 focus:border-red-600'}`}
                                {...register("productkey")}
                            />
                            <label className="label">
                                {errors.productkey?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productkey.message}</span>}

                            </label>
                        </div>
                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start '>Description</label>
                            <textarea
                                type="text"
                                Value={productkeys.description}
                                className={`input input-sm  max-w-xs  border-green-700  focus:outline-0 rounded-sm  mt-1  lg:w-96 focus:border-blue-500  login-container-input ${errors.description && 'border-red-600 focus:border-red-600'}`}
                                {...register("description")}
                            />

                            <label className="label">
                                {errors.description?.type === 'required' && <span className="label-text-alt text-red-700">{errors.description.message}</span>}

                            </label>
                        </div>


                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Key Type</label>
                            <select
                                Value={productkeys.keytype}
                                {...register("keytype")}

                                className={`input input-sm  lg:w-64 md:w-52  focus:outline-0 rounded-sm  border-green-700 mt-1   focus:border-blue-500  login-container-input ${errors.keytype && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>{productkeys.keytype} </option>
                                {
                                    keys.map((key) => <option key={key._id} >{key.key}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.keytype?.type === 'required' && <span className="label-text-alt text-red-700">{errors.keytype.message}</span>}

                            </label>
                        </div>
                    </div>

                    <input className='input  btn btn-sm rounded-md mx-1 bg-green-700 px-6 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Submit' />

                    <Link to='/dashboard/productKey' className="btn btn-sm rounded-md px-6 mx-1 bg-red-600 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white"><RxCross2 />
                        cancel</Link>



                </form>
            </div>
        </div>
    );
};

export default ProductKeyEdit;