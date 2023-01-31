import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const RequisitionCreate = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const [searchVal, setSearchVal] = useState("");
    const [selectVal, setSelectVal] = useState([]);

  console.log("select value",selectVal)

    // -------------------- budgetCode get method----------------------
    const [budgetCodes, setBudgetCodes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/budgetcode')
            .then(res => res.json())
            .then(data => setBudgetCodes(data))
    }, []);
    // -------------------- budgetCode get method----------------------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    // console.log(products)

    // onClick={()=>setSelectVal(val.productName)} 
    //=================================
    const [data, setData] = useState({
        productName: "",
    })
    const handleInputChange = (e) => {
        console.log("onChange data", e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    //==============================================
    const onSubmit = (data) => {
        const url = 'http://localhost:5000/productkey'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success("Data Added Successfully!!!");
                reset();
            })
        navigate('/dashboard/productKey');
    }
    return (
        <div className='m-10'>
            <h1 className='text-2xl '>Create Requisition</h1>
            <div className='mt-5'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='lg:flex lg:gap-5'>
                        {/* ---------------------Requisition Notes Input Field --------------------------- */}
                        <div className='flex flex-col'>
                            <div className="form-control">
                                <label className='text-start '>Requisition Notes</label>
                                <input
                                    type="text"
                                    placeholder='Requisition Notes'
                                    className={`input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-96  focus:border-blue-500  login-container-input ${errors.requisitionNotes && 'border-red-600 focus:border-red-600'}`}
                                    {...register("requisitionNotes", {
                                        required: {
                                            value: true,
                                            message: "❌  Please Fillup  Input Field"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.requisitionNotes?.type === 'required' && <span className="label-text-alt text-red-700">{errors.requisitionNotes.message}</span>}

                                </label>
                            </div>
                            {/* ------------------------------------------------- */}
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Product</th>
                                            <th>Unit Qnty</th>
                                            <th>Total Qnty</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>1</th>
                                            <td>

                                                 {selectVal}

                                            </td>
                                            <td>

                                                <input type="number" className='input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-36  focus:border-blue-500 ' ></input>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ----------------- */}



                        {/* -----------------------Department Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Budget Code</label>
                            <select onChange={handleInputChange}  {...register("budgetCode")}
                                name="budgetCode"
                               
                                className={`input input-sm  lg:w-96 md:w-64  focus:outline-0 rounded-sm  border-green-700 mt-1   focus:border-blue-500  login-container-input ${errors.keytype && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select key type--</option>
                                {
                                    products.map((budgetCode) => <option>{budgetCode.budgetCode}</option>)
                                }

                            </select>

                            <label className="label">
                                {errors.keytype?.type === 'required' && <span className="label-text-alt text-red-700">{errors.keytype.message}</span>}

                            </label>

                            <div className="flex flex-col">

                                <div >
                                    <div className="flex items-center">
                                        <input onChange={(event) => { setSearchVal(event.target.value) }} type="text" placeholder="Search…" className="input input-sm rounded-sm lg:w-96   border-green-700 " />

                                        <button className="btn h-9  w-10 btn-sm  rounded-md bg-green-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        </button>
                                    </div>
                                    <div className='form-control'>


                                        <label className='text-start'>Product Name</label>
                                      
                                    
                                            {products.filter((val) => {
                                                if (searchVal === "") {
                                                    return val;
                                                } else if (val.productName.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())) {
                                                    return val
                                                }
                                            }).map((val, key) => <ul >
                                                <li onClick={()=>setSelectVal(val.productName)}   onChange={handleInputChange}>{val.productName}</li>
                                            </ul>

                                            )}

                                     



                                    </div>
                                </div>
                            </div>

                            {/* ----------------- */}
                            {/* <label className='text-start'>Product Name</label> */}
                            {/* <select   {...register("productName", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                                className={`input input-sm  lg:w-96 md:w-64  focus:outline-0 rounded-sm   mt-1     login-container-input ${errors.keytype && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}> 
                            <option value=''>--Select key type--</option>
                          
                            </select> */}


                        </div>

                    </div>

                    <input className='input  btn btn-xs mx-1 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Request' />

                    <Link to='/dashboard/requisition' className="btn btn-xs mx-1 bg-warning text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white"><RxCross2 />
                        cancel</Link>



                </form>
            </div>
        </div>
    );
};

export default RequisitionCreate;