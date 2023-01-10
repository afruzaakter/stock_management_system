import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const Setting = () => {
    const [addSupplier, setAddSupplier] = useState(false);
    return (
        <div className='border m-1 p-1 rounded-lg m-6'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Employee Designation</h1>
                </div>

            </div>

            <div className='mb-2 flex justify-between '>
                <div>

                    {/* <button onClick={() => setAddSupplier(!addSupplier)} to="" className='btn btn-sm mx-1 bg-green-700 text-white'><FaPlus />  Add New Supplier</button>
              {
                addSupplier && <ul>
                    <li className={`text-gray-300 text-md  flex items-start    text-xl  rounded-md mt-1  `}><Link to="/dashboard/department" className=' font-medium border-b border-gray-400  rounded-md  hover:bg-rose-400  '>
                        <span  >  </span>
                        <span className=' text-gray-800' >Department</span></Link></li>
                </ul>
              } */}


                    {/* <!-- The button to open modal --> */}
                    <label for="my-modal" className="btn btn-sm mx-1 bg-green-700 text-white"><FaPlus /> Add New Supplier</label>

                    {/* <!-- Put this part before </body> tag --> */}
                    <input type="checkbox" id="my-modal" class="modal-toggle" />
                    <label for="my-modal" class="modal cursor-pointer mr-96 mt-0">
                        <label class="modal-box relative" for="">
                            <ul>
                            <li className={`text-gray-300 text-md  flex items-start ml-4 hover:text-rose-300  text-xl  hover:text-green-800 `}><Link to="/dashboard/department" className=' font-medium    '>
                        <span className={` text-gray-800 `}>Department </span></Link></li> 
                            <li className={`text-gray-300 text-md  flex items-start ml-4 hover:text-rose-300  text-xl  rounded-md  `}><Link to="/dashboard/designation" className=' font-medium      '>
                        <span className={` text-gray-800 `}>Designation </span></Link></li> 
                            <li className={`text-gray-300 text-md  flex items-start ml-4 hover:text-rose-300  text-xl   `}><Link to="/dashboard/productkey" className=' font-medium     '>
                        <span className={` text-gray-800 `}>Product Key </span></Link></li> 
                            </ul>
                        </label>
                    </label>

                    {/* <label 
               
                for="my-modal-6" className="btn btn-sm mx-1 bg-green-700 text-white"><FaPlus />  Add</label> */}

                    <Link to='' className="btn btn-sm mx-1 bg-success text-white">
                        <FiEdit /> Edit Supplier</Link>
                    <button
                        // onClick={()=> handleDelete(department._id)} 
                        className="btn btn-sm mx-1 bg-blue-700 text-white">
                        <AiOutlineDelete /> Delete Supplier</button>
                </div>

            </div>


            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Name</th>
                            <th>Contact Person </th>
                            <th>Contact No  </th>
                            <th>Code </th>
                            <th>Address </th>

                        </tr>
                    </thead>

                    <tbody>



                        <tr >
                            <th> 01</th>
                            <td>Goinnovior Technology</td>
                            <td>Razu</td>
                            <td>01743252525</td>
                            <td>1245</td>
                            <td>
                                Dhaka, Mirpur
                                {/* <button onClick={() => handleDelete(designation._id)}><AiOutlineDelete /> </button> 
                              <Link to={`/dashboard/designationEdit/${designation._id}`} className="btn btn-sm mx-1 bg-success text-white">
                         <FiEdit /> </Link>  */}
                            </td>
                        </tr>




                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Setting;