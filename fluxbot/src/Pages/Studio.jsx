import React from 'react'
import Menubar from '../Components/Menubar'
import { FaPlay } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import Flow from '../Components/Flow';
import Pane from '../Components/Pane';



function Studio() {
  return (
    <div>
        <h1 className='bg-black text-center pt-4 text-white text-2xl'> FLUX STUDIO</h1>
        <h1 className='w-full items-center  flex h-[3rem] justify-end bg-black text-white pr-4 '>

            
            <div className='w-[25%] flex   justify-around'>
                <button className='flex items-center gap-3 px-2 py-1 rounded-md bg-gray-800 '>Test <FaPlay /></button>
                <button  className='flex items-center gap-3 px-2 py-1 rounded-md bg-gray-800 '> Share <IoShareSocialOutline /></button>
                <button  className='flex items-center gap-3 px-2 py-1 rounded-md bg-[#399918]'>Go live <IoRocketOutline /></button>
            </div>
            </h1>
        <Menubar/>
        
    </div>
  )
}

export default Studio