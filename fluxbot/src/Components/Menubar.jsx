import React, { useState } from 'react';
import { FaRobot, FaProjectDiagram, FaCogs, FaChartBar, FaTools, FaUserShield, FaQuestionCircle, FaSignOutAlt, FaBars, FaFileAlt, FaImage } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoExtensionPuzzleOutline, IoArrowDownSharp, IoLocationSharp, IoVideocam } from "react-icons/io5";
import { LuTestTube2 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from "react-icons/ai";
import { TiFlowMerge } from "react-icons/ti";
import { FaDatabase, FaFileAudio } from "react-icons/fa6";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ImFileEmpty } from "react-icons/im";
import { CiVideoOn } from "react-icons/ci";


import Flow from './Flow';



function Menubar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [showPane, setShowPane] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const togglePane = () => {
    setShowPane(!showPane);
  };

  const closePane = () => {
    setShowPane(false);
  };

  return (
    <div className="flex">
      <div className={`fixed top-10 left-0 h-full bg-black p-5 shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
        <div className="flex justify-between items-center mb-5 ">
          <div className="flex items-center gap-3 text-white ">
            <FaRobot />
            {isExpanded && <span>BotFlow Studio</span>}
          </div>
          <button onClick={toggleSidebar} className="text-white ml-4">
            <FaBars />
          </button>
          <button onClick={togglePane} className=''>
            <IoArrowDownSharp style={{color:'white'}} />
          </button>
        </div>
        <ul className="list-none flex gap-2 flex-col p-0">
          <li
            className="mb-4 flex items-center gap-3 text-white relative"
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <FaProjectDiagram />
            {isExpanded && <span>Projects</span>}
            {isExpanded && hoveredIndex === 0 && (
              <div className="hover-menu absolute right-[-5rem] top-0 h-[8rem] bg-black p-4 w-[12rem] rounded-md shadow-lg z-10">
                <div className='flex flex-col justify-around gap-4 items-right'>
                  <p className='flex items-center gap-2'>Add Workflow <TiFlowMerge /> </p>
                  <p className='flex items-center gap-2'>BotBase <FaDatabase /></p>
                  <p className='flex items-center gap-2'>Add Folder <MdOutlineCreateNewFolder /></p>
                </div>
              </div>
            )}
          </li>

          <li
            className="mb-4 flex items-center gap-3 text-white relative"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <FaCogs />
            {isExpanded && <span>Intents</span>}
            {isExpanded && hoveredIndex === 1 && (
              <div className="hover-menu absolute right-[0rem] top-0 bg-black p-4 rounded-md shadow-lg z-10">
                <div className='flex flex-col gap-4'>
                  <p>Create Intent</p>
                  <p>Edit Intents</p>
                  <p>Delete Intent</p>
                  <p>Intent Analytics</p>
                  <p>Import Intents</p>
                </div>
              </div>
            )}
          </li>

          <li
            className="mb-4 flex items-center gap-3 text-white relative"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <FaCogs />
            {isExpanded && <span>Entities</span>}
            {isExpanded && hoveredIndex === 2 && (
              <div className="hover-menu absolute right-[-10rem] top-0 bg-black p-4 rounded-md shadow-lg z-10">
                <p>Entities Details</p>
              </div>
            )}
          </li>
          <li
            className="mb-4 flex items-center gap-3 text-white relative"
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <IoExtensionPuzzleOutline />
            {isExpanded && <span>Integrations</span>}
            {isExpanded && hoveredIndex === 3 && (
              <div className="hover-menu absolute right-[-10rem] top-0 bg-black p-4 rounded-md shadow-xl z-10">
                <p>Integrations Details</p>
              </div>
            )}
          </li>

          <li
            className="mb-4 flex items-center gap-3 text-white relative"
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
          >
            <FaTools />
            {isExpanded && <span>Training</span>}
            {isExpanded && hoveredIndex === 4 && (
              <div className="hover-menu absolute right-[-10rem] top-0 bg-black p-4 rounded-md shadow-lg z-10">
                <p>Training Details</p>
              </div>
            )}
          </li>

          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <LuTestTube2 />
            {isExpanded && <span>Testing</span>}
          </li>
          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <AiOutlineDeploymentUnit />
            {isExpanded && <span>Deployment</span>}
          </li>
          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <FaChartBar />
            {isExpanded && <span>Analytics</span>}
          </li>
          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <FaUserShield />
            {isExpanded && <span>User Management</span>}
          </li>
          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <CiSettings />
            {isExpanded && <span>Settings</span>}
          </li>
          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <FaQuestionCircle />
            {isExpanded && <span>Help & Documentation</span>}
          </li>
          <li className="mb-4 flex items-center gap-3 text-white hover:text-blue-500 cursor-pointer">
            <FaSignOutAlt />
            {isExpanded && <span>Logout</span>}
          </li>
        </ul>
      </div>
      {showPane && (
        <div className='absolute px-4  gap-3 left-[8rem] flex flex-col justify-around items-start py-5  bg-[#222831] w-[20rem] h-[40rem] z-[1000] text-white'>
          <div className='w-full h-full rounded-xl pt-2 pb-2 pl-2 pr-2 border-2 border-white'>
  <h2 className='text-lg font-bold mb-4'>Message Cards</h2>
  <div className='grid grid-cols-3 gap-2'>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
                <AiOutlineFileText />
                text
              </div>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
                <IoLocationSharp />
                Location
              </div>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
              <ImFileEmpty />
                file
              </div>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
                <AiOutlineAudio />
                audio
              </div>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
              <CiVideoOn />
                video
              </div>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
                <AiOutlineDeploymentUnit />
                carousel
              </div>
              <div className='border-2 border-white w-full rounded-sm p-2 flex items-center gap-2'>
                <FaImage />
                image
              </div>
            </div>
          </div>

      

          <div  className=' w-full h-full border-2 pt-2 pl-2 border-white rounded-xl'>Query Cards </div>
          <div  className=' w-full h-full border-2 pt-2 pl-2 border-white rounded-xl'>Logic</div>
        </div>
      )}
      <div className={`transition-all duration-300 flex-grow ${isExpanded ? 'w-[85%] ml-[17%]' : 'w-[100%] ml-[5%]'}`}>
        <Flow isExpanded={isExpanded} />
      </div>
    </div>
  );
}

export default Menubar;
