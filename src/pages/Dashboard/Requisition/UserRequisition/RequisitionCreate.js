import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';

const RequisitionCreate = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [user] = useAuthState(auth)

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

    // ============================================
    // --For searching product---
    const [searchVal, setSearchVal] = useState("");

    // --selectedBudgetCode and filter data form under BudgetCode ---------
    const [selectedBudgetCode, setSelectedBudgetCode] = useState([]);
    const selectedProducts = products.filter(product => product.budgetCode === selectedBudgetCode);

    // --Multiple productName selected and show the table------
    const [selectedProduct, setSelectedProduct] = useState([]);
    const handleRowClick = (selectedItem) => {
        setSelectedProduct([...selectedProduct, selectedItem]);
    };

    //-------------- Auto Date -------------
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const currentDate = day + '-' + month + '-' + year;

    // ---- For initial quantity filed value 1 ----
    const [minValue, setMinValue] = useState(1);
    const handleChange = (event) => {
        const newValue = Number(event.target.value);
        setMinValue(newValue >= 1 ? newValue : 1);
    };
    //    
    const deleteProduct = (deleteId) => {
        console.log(deleteId);
        const remaining = selectedProduct.filter(product => product._id !== deleteId);
        setSelectedProduct(remaining);
    }
    //===========for auto generate requisition serial code ========
    const [allRequisitions, setAllRequisitions] = useState([]);
    const [requisitionSerialCode, setRequisitionSerialCode] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/createRequisition")
            .then(res => res.json())
            .then(data => setAllRequisitions(data))
    }, [])


    useEffect(() => {
        const codeList = allRequisitions?.map(requisition => (requisition.requisitionSerialCode));
        // console.log("124", codeList)
        const length = codeList.length;
        console.log("code list", codeList)

        if (length === 0) {
            setRequisitionSerialCode(10001)
        } else {
            const lastValue = codeList[length - 1];
            const lastCode = parseInt(+lastValue);
            setRequisitionSerialCode(lastCode + 1)
        }
    }, [allRequisitions]);

    const autoGenerate = String(requisitionSerialCode)

    console.log('auto code', requisitionSerialCode)
    console.log('auto code autoGenerate', autoGenerate)


    //==============================================
    const onSubmit = (data) => {

        //    console.log("table data", data)
        const url = 'http://localhost:5000/createRequisition'
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
                toast.success("Requisition Created Successfully");
                reset();
            })
        navigate('/dashboard/requisition');
    }

    return (
        <div className='border m-2 p-2 rounded-lg'>
            <div className='p-1 mb-2'>
                <h1 className='text-2xl font-bold'>Create Requisition </h1>
            </div>

            <div className='lg:flex lg:gap-4'>
                {/* ----------Left side >>>- Requisition Notes Input Field ----------------- */}
                <div className='w-8/12'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-control w-full">
                            <label className='text-start '>Requisition Notes</label>
                            <input
                                type="text"
                                placeholder='Requisition Notes'
                                className={`input input-sm w-full  border border-green-700 focus:outline-0 rounded-sm  mt-1    focus:border-blue-500  login-container-input ${errors.requisitionNotes && 'border-red-600 focus:border-red-600'}`}
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

                        {/* //--------------Date -Month -and- year-------------- */}
                        <div className='form-control'>
                            <input
                                type="text"
                                className='hidden'
                                defaultValue={currentDate}
                                {...register("date")}>
                            </input>
                        </div>

                        {/* ------- email field ---------- */}
                        <div className='form-control'>
                            <input
                                type="email"
                                className='hidden'
                                defaultValue={user.email}
                                {...register("email")}>
                            </input>
                        </div>

                        {/* ------- autocode field ---------- */}
                        <div className='form-control'>
                            <input
                                // type="text"
                                className='hidden'
                                defaultValue={autoGenerate}
                                {...register("autoCode")}>
                            </input>
                        </div>

                        {/* ------------------------------------------------- */}
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className='w-1/12'>Sl</th>
                                        <th className='w-7/12'>Product</th>
                                        <th className='w-3/12'>Total Qnty</th>
                                        <th className='w-1/12'></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        selectedProduct?.map((product, index) =>
                                            <tr key={product._id}>
                                                <th>{index + 1} </th>

                                                <td>
                                                    <span>
                                                        {product.productName}
                                                    </span>

                                                    <input
                                                        defaultValue={product.productName}
                                                        className="hidden"
                                                        {...(register(`productName ${index + 1}`))}>
                                                    </input>
                                                </td>

                                                <td>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        Value={minValue}
                                                        onChange={handleChange}
                                                        {...register(`productQuantity ${index + 1}`, {
                                                            required: {
                                                                minLength: 1,
                                                                value: true,
                                                                message: "❌  Please Fillup  Input Field"
                                                            }
                                                        })}
                                                        className='input input-sm  max-w-xs border border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-36  focus:border-blue-500 ' >
                                                    </input>
                                                </td>
                                                <td onClick={() => deleteProduct(product._id)}>
                                                    <RiDeleteBin2Fill className='text-xl text-red-600 hover:cursor-pointer' />
                                                </td>
                                            </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>

                        <input className='input  btn btn-xs  bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Request' />

                        <Link to='/dashboard/requisition' className="btn btn-xs mx-1 bg-warning text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white"><RxCross2 />
                            cancel</Link>

                    </form>
                </div>

                {/* --------------------Right side>>> BudgetCode && Product Field ------------- */}
                <div className="w-4/12">
                    <div>
                        <label className='text-xl text-green-700 font-bold '>Add Your Product </label>
                        {/* <label className='text-start'>Budget Code</label> */}
                        <select
                            onChange={e => setSelectedBudgetCode(e.target.value)}
                            className={`input input-sm w-full  focus:outline-0 rounded-sm  border-green-700 mt-1   focus:border-blue-500  login-container-input `}>
                            <option value=''>--Select Budget Code-- </option>
                            {
                                budgetCodes.map((budgetCode) => <option key={budgetCode._id}> {budgetCode.budgetCode} </option>)
                            }

                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            onChange={(event) => { setSearchVal(event.target.value) }}
                            type="text"
                            placeholder="Search…"
                            className="input input-sm rounded-sm w-full border-green-700 ">
                        </input>
                        <button className="btn h-9  w-10 btn-sm  rounded-md bg-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>

                    <div>
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
                                        <li className=" flex justify-between">
                                            <h2>  {val.productName}</h2>
                                            <button
                                                onClick={() => handleRowClick(val)}
                                                className='btn btn-sm bg-green-600 text-white rounded-md px-4 hover:bg-primary hover:text-white'>
                                                Add
                                            </button>
                                        </li>
                                        <hr />
                                    </ul>

                                    )
                                }
                            </>
                        }

                        {
                            selectedProducts?.map((product) =>
                                <ul>
                                    <li className=" flex justify-between">
                                        <h2> {product.productName} </h2>
                                        <button
                                            onClick={() => handleRowClick(product)}
                                            className='btn btn-sm bg-green-600 text-white rounded-md px-4 hover:bg-primary hover:text-white'>Add</button>
                                    </li>
                                    <hr />
                                </ul>)
                        }
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RequisitionCreate;