import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';
const SupplierEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { id } = useParams()
    const navigate = useNavigate();
    //---------- update data show method----------
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        const url = `https://stock-management-system-server.vercel.app/supplier/${id}`

        fetch(url)
            .then(res => res.json())
            .then(data => setSuppliers(data))
    }, []);

    const onSubmit = (data) => {
        const supplierCompany = data.supplierCompany === "" ? suppliers.supplierCompany : data.supplierCompany;
        const autoCode = data.autoCode === "" ? suppliers.autoCode : data.autoCode;
        const email = data.email === "" ? suppliers.email : data.email;
        const contactPerson = data.contactPerson === "" ? suppliers.contactPerson : data.contactPerson;
        const contactNumber = data.contactNumber === "" ? suppliers.contactNumber : data.contactNumber;
        const address = data.address === "" ? suppliers.address : data.address;
        const updateData = {
            supplierCompany,
            autoCode,
            email,
            contactPerson,
            contactNumber,
            address
        }

        // console.log("update data", updateData);

        const url = `https://stock-management-system-server.vercel.app/supplier/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Data Update Successfully !!!');
                reset();
            })
        navigate('/dashboard/supplier');
    }

    return (
        <div className='m-10'>

            <div>
                <h1 className='text-2xl font-bold mb-5'>Update Supplier</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {/* -----------------------Supplier Company Name Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start '>Name (Company,Distributor,Dealer)</label>
                            <input
                                type="text"
                                Value={suppliers.supplierCompany}
                                placeholder='Supplier Name'
                                className={`input input-sm max-w-xs border border-green-800 focus:outline-0 rounded-sm  mt-1  lg:w-80   focus:border-blue-800  login-container-input ${errors.suppliercompany && 'border-red-600 focus:border-red-600'}`}
                                {...register("supplierCompany")}
                            />
                            <label className="label">
                                {errors.supplierCompany?.type === 'required' && <span className="label-text-alt text-red-700">{errors.supplierCompany.message}</span>}

                            </label>
                        </div>

                        {/* -----------------------Supplier Code Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Auto Code</label>
                            <input
                                type="text"
                                Value={suppliers.autoCode}
                                placeholder='autoCode'
                                className={`input input-sm  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1  lg:w-80 focus:border-blue-500  login-container-input ${errors.autoCode && 'border-red-600 focus:border-red-600'}`}
                                {...register("code")}
                            />
                            <label className="label">
                                {errors.autoCode?.type === 'required' && <span className="label-text-alt text-red-700">{errors.autoCode.message}</span>}

                            </label>
                        </div>
                        {/* -----------------------Supplier Email Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start w'>Email</label>
                            <input
                                type="email"
                                Value={suppliers.email}
                                placeholder='E-mail'
                                className={`input input-sm  lg:w-80 max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1  focus:border-blue-500  login-container-input ${errors.email && 'border-red-600 focus:border-red-600'}`}
                                {...register("email")}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}

                            </label>
                        </div>


                        {/* -----------------------Supplier Contact Person Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Contact Person</label>
                            <input
                                type="text"
                                Value={suppliers.contactPerson}
                                placeholder='Contact Person'
                                className={`input input-sm  lg:w-80  max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1  focus:border-blue-500  login-container-input ${errors.contactPerson && 'border-red-600 focus:border-red-600'}`}
                                {...register("contactPerson")}
                            />
                            <label className="label">
                                {errors.contactPerson?.type === 'required' && <span className="label-text-alt text-red-700">{errors.contactPerson.message}</span>}

                            </label>
                        </div>
                        {/* -----------------------Supplier Contact Number Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start '>Contact Number</label>
                            <input
                                type="phone"
                                Value={suppliers.contactNumber}
                                placeholder='01✕✕✕✕✕✕✕✕'
                                className={`input input-sm  lg:w-80 max-w-xs border-green-700 focus:outline-0 rounded-sm  mt-1  focus:border-blue-500  login-container-input ${errors.contactNumber && 'border-red-600 focus:border-red-600'}`}
                                {...register("contactNumber")}
                            />
                            <label className="label">
                                {errors.contactNumber?.type === 'required' && <span className="label-text-alt text-red-700">{errors.contactNumber.message}</span>}

                            </label>
                        </div>
                        {/* -----------------------Supplier Address Field ------------------------------ */}

                        <div className="form-control">
                            <label className='text-start'>Address</label>
                            <input
                                type="text"
                                Value={suppliers.address}
                                placeholder='Address'
                                className={`input input-sm  lg:w-80 max-w-xs border-green-700 border-bold focus:outline-0 rounded-sm  mt-1  focus:border-blue-500  login-container-input ${errors.address && 'border-red-600 focus:border-red-600'}`}
                                {...register("address")}
                            />
                            <label className="label">
                                {errors.address?.type === 'required' && <span className="label-text-alt text-red-700">{errors.address.message}</span>}

                            </label>
                        </div>

                    </div>

                    <input className='input btn btn-sm
                   mx-1 bg-green-700 text-white  rounded-md px-4 max-w-xs cursor-pointer font-bold  hover:bg-primary hover:text-white ' type="submit" value='◲ Update' />
                    {/* <button className="btn btn-sm mx-1 bg-gray-600  text-white">
                 <BiRefresh className='text-xl ' /> Reset</button> */}
                    <Link to='/dashboard/supplier' className="btn bg-red-600 px-6 rounded-md btn-sm  outline-2  mx-1 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white"> <RxCross2 />
                        back</Link>


                </form>
            </div>
        </div>
    );
};

export default SupplierEdit;