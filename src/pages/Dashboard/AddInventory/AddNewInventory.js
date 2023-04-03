import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

const AddNewInventory = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    // ---------- Drop down Product get method ----------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    const [selectProduct, setSelectProduct] = useState([]);
    // console.log(selectProduct)
    const selectedProductName = products.filter(product => product.productName === selectProduct);
    // console.log("Product Name filter", selectedProductName)

    // ---------- Drop down budgetCodes get method ----------
    const [budgetCodes, setBudgetCodes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/budgetcode')
            .then(res => res.json())
            .then(data => setBudgetCodes(data))
    }, [])
    // ---------- Drop down Product get method ----------
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/supplier')
            .then(res => res.json())
            .then(data => setSuppliers(data))
    }, [])


    // --selectedBudgetCode and filter data form under BudgetCode ---------
    const [selectedBudgetCode, setSelectedBudgetCode] = useState([]);
    const selectedProducts = products.filter(product => product.budgetCode === selectedBudgetCode);

 



    //Unique Product name 
    const uniqueProductName = selectedProducts.filter((newProduct, index, self) =>
        index === self.findIndex((product) => (
            product.productName === newProduct.productName))
    );


    //------- for auto generate code 
    // const [addInventories, setAddInventories] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/addInventory')
    //         .then(res => res.json())
    //         .then(data => setAddInventories(data))

    // }, [])
    //===========Product code====================

    // const [autoCode, setAutoCode] = useState();
    // useEffect(() => {
    //     const codeList = addInventories?.map(addInventorie => addInventorie.autoCode);
    //     const length = codeList.length;
    //     if (length === 0) {
    //         setAutoCode(1000)
    //     } else {
    //         const lastValue = codeList[length - 1];
    //         const lastCode = +lastValue;
    //         setAutoCode(lastCode + 1)
    //     }
    // }, [addInventories]);

    // ==========================================================================
    const [addInventories, setAddInventories] = useState([]);
    // console.log( addInventories)
    useEffect(() => {
        fetch('http://localhost:5000/addInventory')
            .then(res => res.json())
            .then(data => setAddInventories(data))

    }, [])


    //  console.log(addInventories)

    // Show Orders 
    const [selectInventorys, setSelectInventorys] = useState([]);
    const selectedInventory = addInventories.filter(inventory => inventory.productName === selectInventorys);
    console.log("selectedInventory",selectedInventory)


   //====== alert quantity ==========
   const  alertQuantity = selectedInventory.map(product => product.alertQty);
   console.log("alertQnty", alertQuantity)



    //  const [stocks, setStocks] = useState('')
    //  console.log("total stock",stocks) 

    const stock = selectedInventory.map((inventory) => inventory.quantity)
    console.log("stock", (stock))

    // const array = ['60', '40', '50'];
    const totalQuantity = stock.reduce((total, num) => total + parseInt(num), 0);
    console.log("totalQuantity",totalQuantity);

    //product unique
    //   const uniqueInventories = addInventories.filter((newInventories, index, self) =>
    //   index === self.findIndex((inventories) => (
    //     inventories.productName === newInventories.productName))  
    //   );
    //   console.log(uniqueInventories)





    // ------------- AddInventory Data post method -----------
    const onSubmit = (data) => {
        const updateData = {
            productName: data.productName,
            budgetCode: data.budgetCode,
            supplierCompany: data.supplierCompany,
            purchase: data.purchase,
            unitMeasurement: data.unitMeasurement,
            packSize: data.packSize,       
            // alertQty: data.alertQty,
            quantity: data.quantity,
            totalQuantity: totalQuantity,
            alertQuantity:alertQuantity,
            stock: parseInt(data.quantity )+ parseInt(totalQuantity),
            // autoCode: autoCode,
        }
        const url = "http://localhost:5000/addInventory"
        fetch(url, {
            method: "POST",
            body: JSON.stringify(updateData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Data added Successfully!!!');
                // setUpdated(true)
                reset();
            })
        navigate('/dashboard/addInventory')
    }

    return (
        <div className='border m-2 p-2 rounded-lg bg-slate-100'>
            <div className='p-1 mb-2'>
                <h1 className='text-xl font-medium'>Add New Inventory </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>



                        {/* -------------------- Budget Code Input Field -----------------------   */}
                        <div className="form-control">
                            <label className='text-start '>Budget Code</label>
                            <select
                                onClick={e => setSelectedBudgetCode(e.target.value)}
                                {...register("budgetCode", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.budgetCode && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select Budget Code--</option>

                                {
                                    budgetCodes.map((budgetCode) => <option key={budgetCode._id}>{budgetCode.budgetCode}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.budgetCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.budgetCode.message}</span>}

                            </label>
                        </div>
                        {/* ----------Product Name Field ------------- */}
                        <div className="form-control">
                            <label className='text-start '>Product Name</label>
                            <select
                                //  onClick={e => setSelectProduct(e.target.value)}
                                onClick={e => setSelectInventorys(e.target.value)}

                                {...register("productName", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.productName && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select Product Name--</option>


                                {
                                    uniqueProductName.map((product) => <option key={product._id}>{product.productName}</option>)
                                }


                            </select>

                            <label className="label">
                                {errors.productName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.productName.message}</span>}

                            </label>
                        </div>
                        {/* ----------------Supplier Company Name ------------------ */}
                        <div className="form-control">
                            <label className='text-start '>Supplier Name</label>
                            <select   {...register("supplierCompany", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.supplierCompany && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select Supplier Name--</option>

                                {
                                    suppliers.map((supplier) => <option key={supplier._id}>{supplier.supplierCompany}</option>)
                                }
                            </select>

                            <label className="label">
                                {errors.supplierCompany?.type === 'required' && <span className="label-text-alt text-red-700">{errors.supplierCompany.message}</span>}

                            </label>
                        </div>

                        {/* --------------------Purchase Notes field ----------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Purchase Notes</label>
                            <input
                                type="text"
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.purchase && 'focus:border-red-600 border-red-600 focus:ring-red-600'}`}
                                {...register("purchase", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.purchase?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.purchase.message} </span>}
                            </label>
                        </div>
                        {/* --------------------Product code field ----------------------- */}


                        {/* --------------------Unit of Measurement  field ----------------------- */}
                        <div className="form-control">
                            <label >Unit of Measurement</label>
                            <select   {...register("unitMeasurement", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                                className={`input input-sm  focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.unitMeasurement && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select Unit of Measurement--</option>
                                <option >Qnty</option>
                                <option >kg</option>
                                <option >gm</option>
                                <option >ml</option>
                                <option >Pack</option>
                            </select>
                            <label className="label">
                                {errors.unitMeasurement?.type === 'required' && <span className="label-text-alt text-red-700">{errors.unitMeasurement.message}</span>}

                            </label>
                        </div>
                        {/* --------------------Pack Size  field ----------------------- */}
                        <div className="form-control">
                            <label >Pack Size</label>
                            <select   {...register("packSize", {
                                required: {
                                    value: true,
                                    message: "❌  Please Fillup  Input Field"
                                }
                            })}
                                className={`input input-sm  focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.packSize && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option value=''>--Select Pack Size--</option>
                                <option >Box</option>
                                <option >Bosta</option>
                                <option >Ream</option>
                            </select>
                            <label className="label">
                                {errors.packSize?.type === 'required' && <span className="label-text-alt text-red-700">{errors.packSize.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------alert Qty input field ------------ */}
                        {/* <div className="form-control">
                            <label >Alert Qty</label>
                            <input
                                type="text"
                                placeholder='Alert Quantity'
                                className={`input input-sm  max-w-xs  focus:outline-0 rounded-sm border-green-700   lg:w-80 focus:border-blue-700  login-container-input ${errors.alertQty && 'border-red-600 focus:border-red-600'}`}
                                {...register("alertQty", {
                                    required: {
                                        value: true,
                                        message: "❌  Please Fillup  Input Field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.alertQty?.type === 'required' && <span className="label-text-alt text-red-700">{errors.alertQty.message}</span>}

                            </label>
                        </div> */}
                        {/* --------------------Quantity  field ----------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Quantity</label>
                            <input
                                type="text"
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.quantity && 'focus:border-red-600 border-red-600 focus:ring-red-600'}`}
                                {...register("quantity", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.quantity.message} </span>}
                            </label>
                        </div>
                        {/* --------------------Total Quantity  field ----------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Total Quantity</label>
                            <input
                             
                             Value={totalQuantity}
                                type="text"
                                className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.totalQuantity && 'focus:border-red-600 border-red-600 focus:ring-red-600'}`}
                                {...register("totalQuantity", {
                                    required: {
                                        value: true,
                                        message: "❌  Please fill out  this field"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.totalQuantity?.type === 'required' && <span className="label-text-alt text-red-700">
                                    {errors.totalQuantity.message} </span>}
                            </label>
                        </div>
                        {/* -----------------------   ------------------------------ */}



                    </div>

                    <input className='input  btn btn-sm mx-1 px-6 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Submit' />
                    <Link to='/dashboard/AddInventory' className="btn btn-sm mx-1 px-6  bg-red-600 text-white hover:bg-red-500 hover:text-white"> <RxCross2 /> Cancel
                    </Link>
                </form>
            </div>

        </div>
    );
};

export default AddNewInventory;