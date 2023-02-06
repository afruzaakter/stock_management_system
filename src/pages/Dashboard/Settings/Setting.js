import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useForm, useId } from "react-hook-form";

const Setting = () => {
  // const { register, handleSubmit ,setValue} = useForm();
  // const [selectedValues, setSelectedValues] = useState([]);
  // console.log(selectedValues)
  // const [options, setOptions] = useState([]);
  // console.log(options)

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  // const handleChange = (event) => {
  //   let values = [...selectedValues];
  //   console.log(values)
  //   if (event.target.checked) {
  //     values.push(event.target.value);
  //   } else {
  //     values = values.filter((value) => value !== event.target.value);
  //   }
  //   setSelectedValues(values);
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:5000/budgetcode");
  //     const options = await response.json();
  //     setOptions(options);
  //     setValue("budgetCode", options.value);
  //   }
  //   fetchData();
  // }, []);

  // const { register, handleSubmit, errors } = useForm();
  // const firstNameId = useId("firstName-");
  // const lastNameId = useId("lastName-");
  // const onSubmit = data => {
  //   console.log(data);
  // };


  return (
    <div>
       {/* <form onSubmit={handleSubmit(onSubmit)}>
      {options.map((option) => (
        <div key={option._id}>
          <input
            type="checkbox"
            name={"budgetCode"}
            setValue={options.value}
            {...register("role", {
              required: {
                  value: true,
                  message: "❌  Please Fillup  Input Field"
              }
          })}
            onChange={handleChange}
          />
          {option.label}
        </div>
      ))}
      <input type="submit" />
    </form> */}
      {/* //----------------------- */}
      {/* <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={firstNameId}>First Name</label>
      <input name="firstName" id={firstNameId} ref={register({ required: true })} />
      {errors.firstName && <span>This field is required</span>}
      <label htmlFor={lastNameId}>Last Name</label>
      <input name="lastName" id={lastNameId} ref={register({ required: true })} />
      {errors.lastName && <span>This field is required</span>}
      <input type="submit" />
    </form> */}
    </div>
  );
};

export default Setting;