import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const UserEdit = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    // ------fetch 
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        fetch("https://stock-management-system-server.vercel.app/employee")
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    // --------------update method-----
    const [users, setUsers] = useState({})
    useEffect(() => {
        const url = `https://stock-management-system-server.vercel.app/user/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    // console.log("fetch user",users);

    const onSubmit = (data) => {
        const profile = data.profile === "" ? users.profile : data.profile;
        const fullName = data.fullName === "" ? users.fullName : data.fullName;
        const email = data.email === "" ? users.email : data.email;
        const userName = data.userName === "" ? users.userName : data.userName;
        const organization = data.organization === "" ? users.organization : data.organization;
        const userRole = data.userRole === "" ? users.userRole : data.userRole;

        const updateData = {
            profile,
            fullName,
            email,
            userName,
            organization,
            userRole
        }
        console.log("updateData User Management", updateData);

        const url = `https://stock-management-system-server.vercel.app/user/${id}`;
        fetch(url, {
            method: 'PATCH',
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

        navigate('/dashboard/userManagement')
    }

    return (
        <div className='border m-2 p-2 rounded-lg'>
            <div className='p-1 mb-2'>
                <h1 className='text-xl font-medium'>Edit User </h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>

                        {/* -----------------------Employee Profile Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Employee Profile </label>
                            <select
                                Value={users.profile}
                                {...register("profile")}

                                className={`input input-sm w-80  focus:outline-0 rounded-sm  border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.profile && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option Value=''> {users.profile}</option>
                                {
                                    employees.map((employee) => <option key={employee._id}>{employee.employeeId}-
                                        {employee.employeeName}-[{employee.email}]</option>)
                                }
                            </select>
                            <label className="label">
                                {errors.profile?.type === 'required' && <span className="label-text-alt text-red-700">{errors.profile.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------- Full Name Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start '>Full Name </label>
                            <input
                                type="text"
                                placeholder="Your Full Name "
                                Value={users.fullName}
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.fullName && 'border-red-600 focus:border-red-600'}`}
                                {...register("fullName")}
                            />
                            <label className="label">
                                {errors.fullName?.type === 'required' && <span className="label-text-alt text-red-700"> {errors.fullName.message} </span>}
                            </label>
                        </div>

                        {/* ----------------------- Email Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start '> Email </label>
                            <input
                                type="text"
                                placeholder="Your Email "
                                Value={users.email}
                                className={`input input-sm max-w-xs border border-green-700 focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500 login-container-input ${errors.email && 'border-red-600 focus:border-red-600'}`}
                                {...register("email")}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------- User-Name Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'> User Name </label>
                            <input
                                type="text"
                                placeholder="Your User Name "
                                Value={users.userName}
                                className={`input input-sm max-w-xs  border-green-700  focus:outline-0 rounded-sm mt-1  w-96 focus:border-blue-500  login-container-input ${errors.userName && 'border-red-600 focus:border-red-600'}`}
                                {...register("userName")}
                            />
                            <label className="label">
                                {errors.userName?.type === 'required' && <span className="label-text-alt text-red-700">{errors.userName.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------- Organization Field ------------------------------ */}
                        <div className="form-control">
                            <label className='text-start'>Organization </label>
                            <select
                                Value={users.organization}
                                {...register("organization")}

                                className={`input input-sm w-80  focus:outline-0 rounded-sm border border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.organization && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option Value=''> {users.organization}</option>
                                <option > Head Quarter </option>
                            </select>

                            <label className="label">
                                {errors.organization?.type === 'required' && <span className="label-text-alt text-red-700">{errors.organization.message}</span>}

                            </label>
                        </div>

                        {/* ----------------------Assign Role Field --------------------------- */}
                        <div className="form-control">
                            <label className='text-start'>Assign User Role </label>
                            <select
                                Value={users.userRole}
                                {...register("userRole")}
                                className={`input input-sm w-80  focus:outline-0 rounded-sm  border-green-700 mt-1 focus:border-blue-500  login-container-input ${errors.userRole && 'focus:border-red-600 border-red-600 focus:ring-red-600'} `}>
                                <option Value=''> {users.userRole} </option>
                                <option> Role_User </option>
                                <option> Role_Admin </option>
                                <option> Role_Approve </option>
                                <option> Role_Authorization </option>
                                <option> Role_Inventory </option>
                                <option> Role_Store </option>
                            </select>

                            <label className="label">
                                {errors.userRole?.type === 'required' && <span className="label-text-alt text-red-700">{errors.userRole.message}</span>}
                            </label>
                        </div>

                        {/* ----------------------    All field end     ------- */}
                    </div>

                    <input className='input  btn btn-sm mx-1 bg-green-700 text-white  max-w-xs cursor-pointer font-bold uppercase hover:bg-primary hover:text-white ' type="submit" value='◲ Update' />
                    <Link to='/dashboard/userManagement' className="btn btn-sm mx-1 bg-warning text-white"> cancel</Link>

                </form>
            </div>
        </div>
    );
};

export default UserEdit;