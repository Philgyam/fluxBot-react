import React,{useState} from 'react'
import { ImFileEmpty } from "react-icons/im";
import { CiVideoOn } from "react-icons/ci";
import { closestCorners, DndContext } from '@dnd-kit/core';
import { IoExtensionPuzzleOutline, IoArrowDownSharp, IoLocationSharp } from "react-icons/io5";
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from "react-icons/ai";
import { FaRobot, FaProjectDiagram, FaCogs, FaChartBar, FaTools, FaUserShield, FaQuestionCircle, FaSignOutAlt, FaBars, FaImage } from "react-icons/fa";



function Pane() {


    const [ paneItems, setPaneItems] = useState([
        {
          id: 0,
          icon: <AiOutlineFileText />,
          label: 'text',
        },
        {
          id: 1,
          icon: <IoLocationSharp />,
          label: 'Location',
        },
        {
          id: 2,
          icon: <ImFileEmpty />,
          label: 'file',
        },
        {
          id: 3,
          icon: <AiOutlineAudio />,
          label: 'audio',
        },
        {
          id: 4,
          icon: <CiVideoOn />,
          label: 'video',
        },
        {
          id: 5,
          icon: <AiOutlineDeploymentUnit />,
          label: 'carousel',
        },
        {
          id: 6,
          icon: <FaImage />,
          label: 'image',
        },
      ])
    
  return (
    <div className='absolute px-4 drops gap-3 left-[8rem] flex flex-col justify-around items-start py-5 bg-[#222831] w-[20rem] h-[40rem] z-[1000] text-white'>
    <div className='w-full h-full rounded-xl pt-2 pb-2 pl-2 pr-2 border-2 border-white'>
      <h2 className='text-lg font-bold mb-4'>Message Cards</h2>
      <div className='grid grid-cols-3 gap-2'>
        <DndContext collisionDetection={closestCorners}>
            
          {paneItems.map((item) => (
            <div key={item.id} className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
              {item.icon}
              {item.label}
            </div>
          ))}
        </DndContext>
      </div>
    </div>
    <div className='w-full h-full border-2 pt-2 pl-2 border-white rounded-xl'>Query Cards </div>
    <div className='w-full h-full border-2 pt-2 pl-2 border-white rounded-xl'>Logic</div>
  </div>
  )
}

export default Pane