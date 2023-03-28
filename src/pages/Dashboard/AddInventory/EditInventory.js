import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

const EditInventory = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const {id} = useParams();

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

              //---------- update data show method----------
    const [inventories, setInventories] = useState([]);
    console.log(inventories)
    useEffect(() => {
        const url = `http://localhost:5000/addInventory/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setInventories(data))
    }, []);
    const onSubmit = (data) =>{
        const budgetCode = data.budgetCode === "" ? inventories.productName : data.budgetCode;
        const productName = data.productName === "" ? inventories.productName : data.productName;
        const supplierCompany = data.supplierCompany === "" ? inventories.supplierCompany : data.supplierCompany;
        const purchase = data.purchase === "" ? inventories.purchase : data.purchase;
        const unitMeasurement = data.unitMeasurement === "" ? inventories.unitMeasurement : data.unitMeasurement;
        const packSize = data.packSize === "" ? inventories.packSize : data.packSize;
        const quantity = data.quantity === "" ? inventories.quantity : data.quantity;
        const totalQuantity = data.totalQuantity === "" ? inventories.totalQuantity : data.totalQuantity;
        const updateData = {
            budgetCode,
            productName,
            supplierCompany,
            purchase,
            unitMeasurement,
            packSize,
            quantity,
            totalQuantity
        }

        const url = `http://localhost:5000/addInventory/${id}`;

        console.log(url)

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                toast.success('Data Update Successfully !!!');
                reset();
            })
        navigate('/dashboard/AddInventory')

    }
    return (
        <div className='border m-2 p-2 rounded-lg bg-slate-100'>
        <div className='p-1 mb-2'>
            <h1 className='text-xl font-medium'>Edit Inventory </h1>
        </div>

        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>

                  

                    {/* -------------------- Budget Code Input Field -----------------------   */}
                    <div className="form-control">
                        <label className='text-start '>Budget Code</label>
                        <select 
                       
                        onClick={e=>setSelectedBudgetCode(e.target.value)}
                
                        {...register("budgetCode")}

                        
                            className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.budgetCode && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                            <option value=''>{inventories.budgetCode}</option>

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
                        
                         onClick={e => setSelectProduct(e.target.value)}
                        {...register("productName")}

                        
                            className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.productName && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                            <option value=''>{inventories.productName}</option>

                           
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
                        <select 
                        
                        {...register("supplierCompany")}
                       
                            className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.supplierCompany && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                            <option value=''>{inventories.supplierCompany}</option>

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
                          Value={inventories.purchase}
                            type="text"
                            className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.purchase && 'focus:border-red-600 border-red-600 focus:ring-red-600'}`}
                            {...register("purchase")}
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
                        <select {...register("unitMeasurement")}
                            className={`input input-sm  focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.unitMeasurement && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                            <option value=''>{inventories.unitMeasurement}</option>
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
                        <select {...register("packSize")}
                            className={`input input-sm  focus:outline-0 rounded-sm  border-green-700   lg:w-80 md:w-64 focus:border-blue-500  login-container-input ${errors.packSize && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                            <option value=''>{inventories.packSize}</option>
                            <option >Box</option>
                            <option >Bosta</option>
                            <option >Ream</option>
                        </select>
                        <label className="label">
                            {errors.packSize?.type === 'required' && <span className="label-text-alt text-red-700">{errors.packSize.message}</span>}

                        </label>
                    </div>
                    {/* --------------------Quantity  field ----------------------- */}
                    <div className="form-control">
                        <label className='text-start'>Quantity</label>
                        <input
                        Value={inventories.quantity}
                            type="text"
                            className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.quantity && 'focus:border-red-600 border-red-600 focus:ring-red-600'}`}
                            {...register("quantity")}
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
                          Value={inventories.totalQuantity}
                            type="text"
                            className={`input input-sm   focus:outline-0 rounded-sm md:w-64 border-green-700   lg:w-80 focus:border-blue-500  login-container-input ${errors.totalQuantity && 'focus:border-red-600 border-red-600 focus:ring-red-600'}`}
                            {...register("totalQuantity")}
                        />
                        <label className="label">
                            {errors.totalQuantity?.type === 'required' && <span className="label-text-alt text-red-700">
                                {errors.totalQuantity.message} </span>}
                        </label>
                    </div>
                    {/* -----------------------   ------------------------------ */}



                </div>

                <input className='input  btn btn-sm mx-1 px-6 bg-green-700 text-white  max-w-xs cursor-pointer  uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Update' />
                <Link to='/dashboard/AddInventory' className="btn btn-sm mx-1 px-6  bg-red-600 text-white hover:bg-red-500 hover:text-white"> <RxCross2 /> Back
                </Link>
            </form>
        </div>

    </div>
    );
};

export default EditInventory;