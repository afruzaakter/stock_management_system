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
    const [searchValue, setSearchVal] = useState("");

    // --selectedBudgetCode and filter data form under BudgetCode ---------
    const [selectedBudgetCode, setSelectedBudgetCode] = useState([]);
    const selectedProducts = products.filter(product => product.budgetCode === selectedBudgetCode);

    console.log("budgetcode filter", selectedProducts)

    // ===Multiple productName selected and show the table =====
    const [selectedProduct, setSelectedProduct] = useState([]);
    const handleRowClick = (selectedItem) => {
        setSelectedProduct([...selectedProduct, selectedItem]);
    };



    // --delete one product------
    const deleteProduct = (deleteId) => {
        const remaining = selectedProduct.filter(product => product._id !== deleteId);
        setSelectedProduct(remaining);
    }

    //==========Requisition Created Date ==============
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // format the time
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const twelveHourClock = hours % 12 || 12;
    const currentTime = `${twelveHourClock}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    // format the date
    const currentDate = day + '-' + month + '-' + year + ' | '+ currentTime;

    // ========== For initial quantity filed value 1 =======
    const [minValue, setMinValue] = useState(1);
    const handleChange = (event) => {
        const newValue = Number(event.target.value);
        setMinValue(newValue >= 1 ? newValue : 1);
    };

    //===========for auto generate requisition serial code ========
    const [allRequisitions, setAllRequisitions] = useState([]);
    const [autoCode, setAutoCode] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/createRequisition")
            .then(res => res.json())
            .then(data => setAllRequisitions(data))
    }, [])

    useEffect(() => {
        const codeList = allRequisitions?.map(requisition => requisition.autoCode);
        const length = codeList.length;
        if (length === 0) {
            setAutoCode(101)
        } else {
            const lastValue = codeList[length - 1];
            const lastCode = +lastValue;
            setAutoCode(lastCode + 1)
        }
    }, [allRequisitions]);

    //==============================================
    const onSubmit = (data) => {

        const arrayOfTotalProduct = [];
        Object.entries(data)
            .filter(([key, value]) => key !== 'requisitionNotes')
            .filter(([key, value]) => key.split(' ')[0] === 'productName')
            .forEach(([key, value], index) => {
                const obj = {
                    productName: data[`productName ${index + 1}`],
                    productQuantity: data[`productQuantity ${index + 1}`],
                };
                arrayOfTotalProduct.push(obj);
            });

        const currentData = {
            autoCode: autoCode,
            userName:user.displayName,
            email: user.email,
            date: currentDate,
            products: arrayOfTotalProduct,
            requisitionNotes: data.requisitionNotes,
            status: "Pending"
        }

        const url = 'http://localhost:5000/createRequisition'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(currentData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
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
                        <select
                            onChange={e => setSelectedBudgetCode(e.target.value)}
                            className={`input input-sm w-full  focus:outline-0 rounded-sm  border-green-700 mt-1   focus:border-blue-500  login-container-input `}>
                            <option value=''> Select Budget Code </option>
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
                        <button className="btn h-9  w-16 btn-sm  rounded-md bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>

                    <div>
                        {
                            selectedProducts.length === 0 && <>
                                {
                                    products.filter((value) => {
                                        if (searchValue === "") {
                                            return value;
                                        } else if (value.productName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
                                            return value;
                                        }
                                    }).map((value) => <ul key={value._id}>
                                        <li className=" flex justify-between">
                                            <h2>  {value.productName}</h2>
                                            <button
                                                onClick={() => handleRowClick(value)}
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