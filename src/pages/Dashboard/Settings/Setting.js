// import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import { useForm } from "react-hook-form";

const Setting = () => {

  const { register, handleSubmit, errors } = useForm();


  const options = [{ role: 'Role_Admin' }, { role: 'Role_User' }]
  const [data, setData] = useState(options);

  // useEffect(() => {
  //   fetch('https://stockmanagementsystemserver-production.up.railway.app/department')
  //     .then(res => res.json())
  //     .then(data => setData(data))

  // }, [])

  const onSubmit = (data) => {
    console.log(data)
  }
  // const onSelect = (data) => {
  //   console.log(data)
  // }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Multiselect
        options={data}
        displayValue="role"
        onSelect={onSelect}
      /> */}

      <input type="submit" />
    </form>
  );
};

export default Setting;