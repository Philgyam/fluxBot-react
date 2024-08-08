import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { CiSettings } from 'react-icons/ci';

function GroupNode({ id, data }) {
  const [children, setChildren] = useState(data.children || []);
  const [childCounter, setChildCounter] = useState(children.length);
  const [borderColor, setBorderColor] = useState('gray-800');
  const [activeChildId, setActiveChildId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [label, setLabel] = useState(data.label || 'Group Node');

  const nodeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    const handleGlobalClick = (event) => {
      if (activeChildId && !nodeRef.current.contains(event.target)) {
      
        setActiveChildId(null); // Clear active child ID after click
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [activeChildId]); // Dependency on activeChildId

  const handleAddChild = (label) => {
    const newChild = {
      id: `${data.label} ${childCounter + 1}`,
      data: { label: label || 'Empty Node' },
    };
    setChildren((prev) => [...prev, newChild]);
    setChildCounter((prev) => prev + 1);
  };

  const handleChildClick = (child, event) => {
    setActiveChildId(child.id);

    // Calculate the position relative to the node
    const nodeRect = nodeRef.current.getBoundingClientRect();
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: top - nodeRect.top + window.scrollY + 20,
      left: left - nodeRect.left + window.scrollX + 240,
    });

    setModalVisible(true);
  };

  const handleDeleteClick = (id) => {
    setChildren((prev) => prev.filter((child) => child.id !== id));
    setActiveChildId(null);
    setModalVisible(false); // Hide modal after deletion
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setBorderColor('green-500');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setBorderColor('gray-800');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const draggedItemLabel = event.dataTransfer.getData('label');
    handleAddChild(draggedItemLabel);
    setBorderColor('gray-800');
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <>
      <div
        ref={nodeRef}
        className={`bg-gray-800 ${borderColor ? `border-2 border-${borderColor}` : ''} rounded-lg shadow-lg px-4 py-3`}
        style={{ minWidth: 250, position: 'relative' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <div className="bg-blue-600 text-white p-3 rounded-t-lg shadow-md">
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            className="bg-transparent text-white outline-none border-none w-full font-semibold"
          />
        </div>
        <div className="p-2">
          {children.map((child) => (
            <div
              key={child.id}
              draggable
              onClick={(e) => handleChildClick(child, e)}
              className={`bg-gray-100 node rounded-lg mb-2 p-3 shadow-md cursor-pointer transition-transform transform hover:scale-105 ${activeChildId === child.id ? 'border-2 border-blue-500' : ''}`}
            >
              {child.data.label}
              {activeChildId === child.id && (
                <>
                  <RiDeleteBin7Fill
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(child.id);
                    }}
                    className="text-red-600 w-4 h-4 float-right ml-2"
                  />
                  <CiSettings className="text-gray-600 w-4 h-4 float-right" />
                </>
              )}
            </div>
          ))}
        </div>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        <button
          className="absolute bottom-2 left-0 right-0 mx-auto w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700"
          onClick={() => handleAddChild()}
        >
          <IoIosAddCircleOutline style={{ color: 'white', fontSize: '24px' }} />
        </button>
      </div>

      {activeChildId && (
        <div
          className='absolute bg-blue-400 w-[6rem] text-center text-white font-bold rounded-md shadow-lg'
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          Child Node Clicked
        </div>
      )}
    </>
  );
}

export default GroupNode;
