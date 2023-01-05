import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { BiRefresh } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Designation = () => {
    const[designations, setDesignations] = useState([]);
    const [updated, setUpdated] = useState(false);
    useEffect(() =>{
        fetch('http://localhost:5000/designation')
        .then(res => res.json())
        .then(data => setDesignations(data))
        
    },[updated])

    const handleDelete = () =>{

    }
    return (
        <div className='border m-1 p-1 rounded-lg m-6'>

        <div className="navbar bg-base-100">
            <div className="flex-1">
                <h1 className='text-3xl'> Employee Designation</h1>
            </div>
            
        </div>

        <div className='mb-2 flex justify-between '>
           <div>
        
              <Link to="/dashboard/designationAdd" className='btn btn-sm mx-1 bg-green-700 text-white'><FaPlus />  Add</Link>

                {/* <label 
               
                for="my-modal-6" className="btn btn-sm mx-1 bg-green-700 text-white"><FaPlus />  Add</label> */}

            <Link to='/dashboard/designationEdit' className="btn btn-sm mx-1 bg-success text-white">
                <FiEdit /> Edit</Link>
            <button 
            // onClick={()=> handleDelete(department._id)} 
            className="btn btn-sm mx-1 bg-blue-700 text-white">
                <AiOutlineDelete /> Delete</button>
           </div>
            <div >
            <button className="btn btn-sm mx-1 bg-gray-600   text-white">
                <BiRefresh className='text-xl ' /> Reset</button>
            <button className="btn btn-sm mx-1 bg-blue-700   text-white">
                <IoMdRefresh /> Refresh</button>
            </div>
        </div>


        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>S No.</th> 
                        <th>Name</th> 
                        <th>Description </th>
                        <th>Show Order  </th>
                        <th>Is System </th>
                        <th>Action </th>
                                                
                    </tr>
                </thead>

                <tbody>
                   
                        {
                            designations.map((designation,index) =>
                            <tr key={designation._id}>
                            <th>{index+1}</th>
                            <td>{designation.name}</td>
                            <td>{designation.description}</td>
                            <td>{designation.order}</td> 
                            <td>No</td> 
                            <td>
                              <button onClick={() => handleDelete(designation._id)}><AiOutlineDelete /> </button> 
                              <Link to={`/dashboard/designationEdit/${designation._id}`} className="btn btn-sm mx-1 bg-success text-white">
                <FiEdit /> </Link> 
                            </td> 
                            </tr>
                            )
                        }
                                               
                  
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Designation;