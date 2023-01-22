import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const Setting = () => {
    const [addSupplier, setAddSupplier] = useState(false);
    const [total, setTotal] = useState(0);
  const { register, handleSubmit, watch, getValues } = useForm();

  const onSubmit = (data) => {
    
    const quantityVal = parseInt(getValues("quantity"));
    const priceVal = parseInt(getValues("price"));
    const totalVal = quantityVal * priceVal;
    setTotal(totalVal);
  };

  console.log(watch("example")); // watch input value by passing the name of it
    return (
        <div>
              <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="0" {...register("quantity")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input defaultValue="0" {...register("price", { required: true })} />

        <input value="submit" type="submit" />
      </form>
      <h4>Total:{total} </h4>
    </div>
        </div>
    );
};

export default Setting;