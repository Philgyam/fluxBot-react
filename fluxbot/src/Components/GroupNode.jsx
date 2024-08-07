import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { CiSettings } from 'react-icons/ci';

function GroupNode({ data, onAddChild, onChildClick }) {
  const [children, setChildren] = useState(data.children || []);
  const [childCounter, setChildCounter] = useState(children.length);
  const [inputValue, setInputValue] = useState('child');
  const [borderColor, setBorderColor] = useState('gray-800'); // Default border color
  const [activeChildId, setActiveChildId] = useState(null); // Track the active child node
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Modal position
  const [dragLabel, setDragLabel] = useState('')

  const nodeRef = useRef(null); // Ref for the node container

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddChild = () => {
    const newChild = {
      id: `${data.id}-child-${childCounter + 1}`,
      data: {
        label: dragLabel.trim() !== '' ? dragLabel : 'Empty Node', // Use the drag label if available
      },
    };
    setChildren((prev) => [...prev, newChild]);
    setChildCounter((prev) => prev + 1);
    setInputValue('New node');

    // Set the newly added node as active
    setActiveChildId(newChild.id);

    // Show modal next to the group node
    if (nodeRef.current) {
      const { top, left, width } = nodeRef.current.getBoundingClientRect();
      setModalPosition({
        top: top + window.scrollY + 10, // Adjust vertical position
        left: left + window.scrollX - 200, // Position to the left of the node
      });
    }

    setModalVisible(true);

    if (onAddChild) onAddChild();
  };

  const handleChildClick = (child) => {
    setActiveChildId(child.id); // Set the clicked child as active
    console.log('Child clicked:', child);
    if (onChildClick) onChildClick(child);
  };

  const handleDeleteClick = (id) => {
    setChildren((prev) => prev.filter((child) => child.id !== id));
    setActiveChildId(null); // Deselect the node after deletion
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow drop
    setBorderColor('green-500'); // Change border color on drag over
  };

  const handleDragEnter = (event) => {
    // You can handle any specific logic here
  };

  const handleDragLeave = (event) => {
    event.preventDefault(); // Allow drop
    setBorderColor('gray-800'); // Reset border color on drag leave
  };

  const handleDrop = (event) => {
    event.preventDefault(); // Allow drop
    event.stopPropagation(); // Stop event from bubbling
    setBorderColor('gray-800'); // Reset border color on drop

    const dataTransfer = event.dataTransfer.getData('text');
    const draggedItem = JSON.parse(dataTransfer); // Retrieve the dragged item data

    if (draggedItem) {
      setDragLabel(draggedItem.label); // Set the drag label from the item
      handleAddChild(); // Add the child node
    }
  };

  // Handle dragging of child nodes
  const handleDragStart = (event, child) => {
    event.dataTransfer.setData('text', JSON.stringify(child)); // Store the child data as JSON string
  };

  const handleDragEnd = (event, child) => {
    event.preventDefault();
    event.stopPropagation();

    // Add logic to handle drag end, if needed
  };

  return (
    <>
      <div
        ref={nodeRef}
        className={`bg-gray-800 ${borderColor ? `border-2 border-${borderColor}` : ''} rounded shadow px-1 py-4`}
        style={{ minWidth: 200, position: 'relative' }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="bg-blue-500 text-white p-2 rounded-t">
          <input
            type="text"
            value='group'
            onChange={handleInputChange}
            className="bg-transparent text-white outline-none border-none w-full"
          />
        </div>
        <div className="p-1">
          {children.map((child, index) => (
            <div
              key={child.id}
              draggable // Make child nodes draggable
              onDragStart={(e) => handleDragStart(e, child)} // Handle drag start
              onDragEnd={(e) => handleDragEnd(e, child)} // Handle drag end
              className={`bg-gray-100 rounded mb-3 p-2 mt-2 shadow-inner cursor-pointer ${activeChildId === child.id ? 'border-2 border-green-500' : ''}`}
              onClick={() => handleChildClick(child)}
            >
              {
               data.label
              }
              {activeChildId === child.id && (
                <>
                  <RiDeleteBin7Fill
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from bubbling up
                      handleDeleteClick(child.id);
                    }}
                    className="text-red-500 w-3 h-3 float-right"
                  />
                  <CiSettings
                    className="text-gray-500 w-3 h-3 float-left mr-1"
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        <button
          className="absolute bottom-1 left-0 right-0 mx-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          onClick={handleAddChild}
        >
          <IoIosAddCircleOutline style={{ color: 'white' }} />
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className='absolute top-0 left-[-6rem] h-[3rem] bg-blue-300 w-[5rem]'
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
            transform: 'translateX(-100%)', // Move the modal to the left
          }}
        >
          hello
        </div>
      )}
    </>
  );
}

export default GroupNode;
