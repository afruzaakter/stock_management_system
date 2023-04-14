import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowRightCircle, BsArrowRightCircleFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

const PreviewRequisition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = useState([]);

  useEffect(() => {
    fetch(`https://stock-management-system-server.vercel.app/createRequisition/${id}`)
      .then((res) => res.json())
      .then((data) => setRequisitions(data));
  }, []);

  const handleReqDelete = (id) => {
    console.log(id);
    const url = `https://stock-management-system-server.vercel.app/createRequisition/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/dashboard/requisition");
      });
  };

  return (
    <div className="m-4 ">
      <div className='p-1 mb-2'>
        <h1 className='text-2xl font-bold'>Preview Requisition </h1>
      </div>
      <div className="flex items-center">
        <BsArrowRightCircle className="text-green-800 text-xl" />
        <h2 className="text-xl ml-2"> Requisition Serial: {requisitions?.autoCode} </h2>
      </div>

      <div className="flex justify-between items-center  rounded-l-md ">
        <div>
          <div className="flex justify-start items-center gap-5 mt-4">
            <AiOutlineCheck className="font-bold text-2xl text-green-900" />
            <div>
              <p> <span className="text-primary font-semibold "> User_Note:  </span>
                {requisitions.requisitionNotes}
              </p>
              <p> <span className="text-primary font-semibold "> Date:</span>
                {requisitions.date}
              </p>
            </div>
          </div>

          {requisitions?.authorizeNotes && (
            <>
              <div className="flex justify-start items-center gap-5 mt-2">
                <AiOutlineCheck className="font-bold text-2xl text-green-900" />
                <div>
                  <p> <span className="text-green-900 font-semibold "> Auth_Note: </span>
                    {requisitions?.authorizeNotes}
                  </p>
                  <p> <span className="text-green-900 font-semibold ">Date: </span>
                    {requisitions?.AuthorizedDate}
                  </p>
                </div>
              </div>
            </>
          )}

          {requisitions?.approvedNotes && (
            <>
              <div className="flex justify-start items-center gap-5 mt-2">
                <AiOutlineCheck className="font-bold text-2xl text-green-900" />
                <div>
                  <p> <span className="text-green-900 font-semibold "> App_Note: </span>
                    {requisitions?.approvedNotes}
                  </p>
                  <p> <span className="text-green-900 font-semibold "> Date: </span>
                    {requisitions?.approvedDate}
                  </p>
                </div>
              </div>
            </>
          )}

          {requisitions?.issuedNotes && (
            <>
              <div className="flex justify-start items-center gap-5 mt-2">
                <AiOutlineCheck className="font-bold text-2xl text-green-900" />
                <div>
                  <p> <span className="text-green-900 font-semibold "> App_Note: </span>
                    {requisitions?.issuedNotes}
                  </p>
                  <p> <span className="text-green-900 font-semibold "> Date: </span>
                    {requisitions?.issuedDate}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <Link to={`/dashboard/requisition`}
            className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600" >  Back
          </Link>
          <Link to={`/dashboard/requisition/preview/edit/${id}`}
            className="btn btn-xs rounded-md  text-blue-900 mx-1 border-blue-600" >  Edit
          </Link>

          <label htmlFor="my-modal-6" className="btn btn-xs rounded-md  text-red-600 mx-1 border-red-600" >
            ❌ Delete
          </label>

          {/* -------- delete modal ----------------- */}
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom justify-around sm:modal-middle ">
            <div className="bg-gray-300 p-5 rounded-md shadow-lg lg:max-w-52">
              <h3 className="font-bold text-lg text-center">
                Are you sure you want to delete it?
              </h3>

              <div className="mr-14 modal-action">
                <label htmlFor="my-modal-6" onClick={() => handleReqDelete(id)} className="btn  btn-sm bg-green-600 text-white rounded-md">  ok </label>
                <label htmlFor="my-modal-6" className="btn btn-sm bg-red-600 rounded-md justify-start text-white" >  Cancel </label>
              </div>
            </div>
          </div>
          {/* -------- delete modal end----------------- */}
        </div>
      </div>

      <div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <td> Product Name</td>
                  <td> Quantity </td>
                </tr>
              </thead>

              <tbody>
                {requisitions.products?.map((product, index) => (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.productQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewRequisition;
