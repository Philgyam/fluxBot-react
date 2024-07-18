import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { IoIosAddCircleOutline } from "react-icons/io";

const GroupNode = ({ data }) => {
  const [children, setChildren] = useState(data.children);
  const [childCounter, setChildCounter] = useState(children.length);
  const [inputValue, setInputValue] = useState("New node");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddChild = () => {
    const newChild = {
      id: `${data.id}-child-${childCounter + 1}`, // Unique ID based on group ID and child counter
      data: {
        label: inputValue.trim() !== '' ? inputValue : `Child ${childCounter + 1}` // Use input value if provided, otherwise default label
      }
    };
    setChildren([...children, newChild]);
    setChildCounter(childCounter + 1); // Increment child counter
    setInputValue("New node"); // Reset input value after adding a child
  };

  return (
    <div className="bg-gray-800 hover:border-2 hover:border-green-800 rounded shadow px-2 py-8" style={{ minWidth: 200, position: 'relative' }}>
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
          <div key={child.id} className="bg-gray-100 rounded p-2 m-2 shadow-inner">
            {child.data.label}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <button className='absolute bottom-1 left-0 right-0 mx-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center' onClick={handleAddChild}>
        <IoIosAddCircleOutline style={{ color: 'white' }} />
      </button>
    </div>
  );
};

export default GroupNode;
