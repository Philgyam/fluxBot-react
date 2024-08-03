import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { IoIosAddCircleOutline } from 'react-icons/io';

function GroupNode({ data, onAddChild, onChildClick }) {
  const [children, setChildren] = useState(data.children || []);
  const [childCounter, setChildCounter] = useState(children.length);
  const [inputValue, setInputValue] = useState('Group');
  const [borderColor, setBorderColor] = useState('gray-800'); // Default border color

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddChild = () => {
    const newChild = {
      id: `${data.id}-child-${childCounter + 1}`,
      data: {
        label: inputValue.trim() !== '' ? inputValue : `Child ${childCounter + 1}`,
      },
    };
    setChildren((prev) => [...prev, newChild]);
    setChildCounter((prev) => prev + 1);
    setInputValue('New node');
    if (onAddChild) onAddChild();
  };

  const handleChildClick = (child) => {
    console.log('Child clicked:', child);
    if (onChildClick) onChildClick(child);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow drop
    setBorderColor('green-500'); // Change border color on drag over
  };

  const handleDragEnter = (event) => {
    
  };

  const handleDragLeave = (event) => {
    event.preventDefault(); // Allow drop
    setBorderColor('gray-800'); // Reset border color on drag leave
  };

  const handleDrop = (event) => {
    event.preventDefault(); // Allow drop
    event.stopPropagation(); // Stop event from bubbling
    handleAddChild()

    setBorderColor('gray-800'); // Reset border color on drop

    const dataTransfer = event.dataTransfer.getData('text');
    if (dataTransfer) {
      // Example of creating a new child node
      const newChild = {
        id: `${data.id}-child-${childCounter + 1}`,
        data: {
          label: `Child ${childCounter + 1}`,
        },
      };
      setChildren((prev) => [...prev, newChild]);
      setChildCounter((prev) => prev + 1);
    }
  };

  return (
    <div
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
          value={inputValue}
          onChange={handleInputChange}
          className="bg-transparent text-white outline-none border-none w-full"
        />
      </div>
      <div className="p-1">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-gray-100 rounded mb-3 p-2 m-2 shadow-inner cursor-pointer"
            onClick={() => handleChildClick(child)}
          >
            Node
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
  );
}

export default GroupNode;
