import React, { useState } from 'react';
import { FaRobot, FaProjectDiagram, FaCogs, FaChartBar, FaTools, FaUserShield, FaQuestionCircle, FaSignOutAlt, FaBars, FaImage } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoExtensionPuzzleOutline, IoArrowDownSharp, IoLocationSharp } from "react-icons/io5";
import { LuTestTube2 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from "react-icons/ai";
import { TiFlowMerge } from "react-icons/ti";
import { FaDatabase } from "react-icons/fa6";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { closestCorners, DndContext } from '@dnd-kit/core';



import Flow from './Flow';

function Menubar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(-1);


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };



  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === 'droppable-div') {
      const activeItem = paneItems.find(item => item.id === active.id);
      if (activeItem) {
        // Add the dropped item to the droppedItems state
        setDroppedItems((prev) => [...prev, activeItem]);
      }
    }
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
         
        </div>
        <ul className="list-none flex gap-2 flex-col p-0">
        <div className={`fixed top-10 left-0 h-full bg-black p-5 shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
        <div className="flex justify-between items-center mb-5 ">
          <div className="flex items-center gap-3 text-white ">
            <FaRobot />
            {isExpanded && <span>BotFlow Studio</span>}
          </div>
          <button onClick={toggleSidebar} className="text-white ml-4">
            <FaBars />
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
        </ul>
      </div>
    
      <div className={`transition-all duration-300 flex-grow ${isExpanded ? 'w-[85%] ml-[17%]' : 'w-[100%] ml-[5%]'}`}>
      <DndContext  collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Flow isExpanded={isExpanded} />
        </DndContext>
      </div>
    </div>
  );
}

export default Menubar;
