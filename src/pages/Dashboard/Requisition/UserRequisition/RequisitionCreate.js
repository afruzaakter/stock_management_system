import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const RequisitionCreate = () => {
    const { register, formState: { errors }, handleSubmit,setValue , reset } = useForm();
    const navigate = useNavigate();





    //------------Quantity count -------------
    const [count, setCount] = useState(1)
    //-------------- onchange  table data pass---------
    const [selectProductData, setSelectProductData] = useState('');
    useEffect(()=>{
        setValue('productName', selectProductData);
    },[selectProductData,setValue])
   




    // -------- budgetCode get method--------------
    const [budgetCodes, setBudgetCodes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/budgetcode')
            .then(res => res.json())
            .then(data => setBudgetCodes(data))
    }, []);
    // -------------- budgetCode get method--------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    // console.log(products);
    // ============================================
    // --For searching product---
    const [searchVal, setSearchVal] = useState("");
    // --selectedBudgetCode and filter data form under BudgetCode ---------
    const [selectedBudgetCode, setSelectedBudgetCode] = useState([]);
    const selectedProducts = products.filter(product => product.budgetCode === selectedBudgetCode)
    // --Multiple productName selected and show the table------
    const [selectedProductName, setSelectedProductName] = useState([]);
    const handleRowClick = (selectedItem) => {
        setSelectedProductName([...selectedProductName, selectedItem]);
        setCount(count)
    };
    // console.log('aaa',selectedProductName);
    //==============================================
    const onSubmit = (data) => {
        console.log("table data", data)
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
        navigate('/dashboard/requisition');
    }

    return (
        <div className='border m-2 p-2 rounded-lg'>
            <div className='p-1 mb-2'>
                <h1 className='text-2xl font-bold'>Create Requisition </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='lg:flex lg:gap-5'>
                        {/* ----------Left side >>>- Requisition Notes Input Field ----------------- */}
                        <div className='flex flex-col lg:w-8/12 '>
                            <div className="form-control w-full ">
                                <label className='text-start '>Requisition Notes</label>
                                <input
                                    type="text"
                                    placeholder='Requisition Notes'
                                    className={`input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1    focus:border-blue-500  login-container-input ${errors.requisitionNotes && 'border-red-600 focus:border-red-600'}`}
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
                                        {
                                            selectedProductName?.map((product, index) => <tr key={product._id}>
                                                <th>{index + 1} </th>
                                                <td 
                                                name="productName" 
                                                 onChange={(event)=>setSelectProductData(event.target.value)} 

                                                setValue={product.productName}
                                                 >
                                                    
                                                    {product.productName} 
                                                 
                                                 
                                                 
                                                 </td>

                                                <td>
                                                    <input
                                                        type="number"
                                                        Value={count}
                                                        {...register("Quantity", {
                                                            required: {
                                                                value: true,
                                                                message: "❌  Please Fillup  Input Field"
                                                            }
                                                        })}
                                                        className='input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-36  focus:border-blue-500 ' >
                                                    </input>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        {...register("TotalQuantity", {
                                                            required: {
                                                                value: true,
                                                                message: "❌  Please Fillup  Input Field"
                                                            }
                                                        })}
                                                        className='input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-36  focus:border-blue-500 ' >
                                                    </input>
                                                </td>
                                            </tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <input className='input  btn btn-xs mx-1 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Request' />

                            <Link to='/dashboard/requisition' className="btn btn-xs mx-1 bg-warning text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white"><RxCross2 />
                                cancel</Link>
                        </div>


                        {/* --------------------Right side>>> Budget Code Field ------------- */}

                        <div className="form-control lg:w-4/12">
                            <div className="form-control">
                                <label className='text-start'>Budget Code</label>
                                <select
                                    onChange={e => setSelectedBudgetCode(e.target.value)}
                                    className={`input input-sm  lg:w-96 md:w-64  focus:outline-0 rounded-sm  border-green-700 mt-1   focus:border-blue-500  login-container-input `}>
                                    <option value=''>--Select Budget Code-- </option>
                                    {
                                        budgetCodes.map((budgetCode) => <option> {budgetCode.budgetCode} </option>)
                                    }

                                </select>
                            </div>


                            <div className="flex flex-col">

                                <div >
                                    <div className="flex items-center">
                                        <input onChange={(event) => { setSearchVal(event.target.value) }} type="text" placeholder="Search…" className="input input-sm rounded-sm lg:w-96   border-green-700 " />

                                        <button className="btn h-9  w-10 btn-sm  rounded-md bg-green-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        </button>
                                    </div>
                                    <div className='form-control'>
                                        <label className='text-start'>---Product Name---</label>

                                        {
                                            selectedProducts.length === 0 && <>
                                                {
                                                    products.filter((val) => {
                                                        if (searchVal === "") {
                                                            return val;
                                                        } else if (val.productName.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())) {
                                                            return val
                                                        }
                                                    }).map((val) => <ul key={val._id}>
                                                        <li onClick={() => handleRowClick(val)}>
                                                            {val.productName}</li>
                                                    </ul>

                                                    )
                                                }
                                            </>

                                        }

                                        {
                                            selectedProducts?.map((product) => <ul>
                                                <li onClick={() => handleRowClick(product)} >
                                                    {product.productName}</li>
                                            </ul>)

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>





                </form>
            </div>
        </div>
    );
};

export default RequisitionCreate;