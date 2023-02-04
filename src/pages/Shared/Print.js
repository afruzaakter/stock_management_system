import React from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import { AiFillFileExcel } from 'react-icons/ai';
const Print = () => {
    return (


        <div >
            <p className='text-center mr-14 mb-2'>print</p>
            <div className='flex justify-center gap-2 items-center '>
                <button className='h-10 w-12 bg-pink-600 rounded-l-md hover:bg-black  group-hover:opacity-100 transition-all duration-300 '><AiFillFilePdf className=' text-xl text-white ml-4' />
                </button>
                <button className='border  absolute bg-white border-gray-600 rounded-full h-7 flex items-center p-1  w-7'>or</button>
                <button className='h-10 w-12 bg-blue-600 rounded-r-md'><AiFillFileExcel className=' text-xl text-white ml-4' /></button>
            </div>
        </div>
    );
};

export default Print;