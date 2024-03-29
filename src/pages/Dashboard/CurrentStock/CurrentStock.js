import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { TbMessageReport } from 'react-icons/tb';
const CurrentStock = () => {

    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     fetch('https://stock-management-system-server.vercel.app/product')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);


    const [addInventories, setAddInventories] = useState([]);
    useEffect(() => {
        fetch('https://stock-management-system-server.vercel.app/addInventory')
            .then(res => res.json())
            .then(data => setAddInventories(data))

    }, [])

    
  //product unique

  const uniqueInventories = addInventories.filter((newInventories, index, self) =>
  index === self.findIndex((inventories) => (
    inventories.productName === newInventories.productName))  
  );

console.log(uniqueInventories)

//========== Quantity ==========

// const productQuantities = {};

// addInventories.forEach((product) => {
//   const productName = product.productName;
//   const quantity = parseInt(product.quantity);

//   if (!productQuantities[productName]) {
//     productQuantities[productName] = quantity;
//   } else {
//     productQuantities[productName] += quantity;
//   }
// });

// console.log(productQuantities);

 

    return (
        <div className='border m-1 p-1 rounded-lg'>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <h1 className='text-3xl'> Current Stock</h1>
                </div>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className='mb-2 flex justify-between'>
                <div>
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-1 btn-sm bg-primary
                         text-white "> <BsSearch /> All Item <IoMdArrowDropdown />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow
                             bg-primary text-white rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                    <button className="btn btn-sm mx-1 bg-warning   text-white">
                        <TbMessageReport /> Reports</button>
                </div>

            </div>


            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th> SL</th>
                            <th>Product Name </th>
                            <th>Budget Code </th>
                            <th>UoM </th>
                            <th>Alert Qty </th>
                            <th>Stock </th>
                           

                        </tr>
                    </thead>

                    <tbody>
                        {
                            addInventories?.slice(0).reverse().map((inventories, index) => <tr key={inventories._id}>
                                <th>{index + 1}</th>
                                <td>{inventories.productName}</td>
                                <td>{inventories.budgetCode}</td>
                                <td>{inventories.unitMeasurement}</td>
                                <td>{inventories.alertQty}</td>
                                {/* <td>{inventories.quantity}</td> */}
                                <td>{inventories.stock}</td>


                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default CurrentStock;