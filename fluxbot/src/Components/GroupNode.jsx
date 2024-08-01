import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useDroppable } from '@dnd-kit/core';

function GroupNode({ data, onAddChild, onChildClick }) {
  const [children, setChildren] = useState(data.children || []);
  const [childCounter, setChildCounter] = useState(children.length);
  const [inputValue, setInputValue] = useState('New node');

  const { isOver, setNodeRef } = useDroppable({
    id: data.id,
    onDrop: (event) => {
      const droppedItemId = event.active.id;
      const droppedItem = event.active.data.current;

      console.log('Dropped item ID:', droppedItemId);
      console.log('Dropped item data:', droppedItem);

      if (droppedItem) {
        const newChild = {
          id: `${data.id}-child-${childCounter + 1}`,
          data: {
            label: droppedItem.label || `Child ${childCounter + 1}`,
          },
        };
        setChildren((prev) => [...prev, newChild]);
        setChildCounter((prev) => prev + 1);
      }
    },
  });

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

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-800 ${isOver ? 'border-2 border-green-800' : ''} rounded shadow px-2 py-8`}
      style={{ minWidth: 200, position: 'relative' }}
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
            className="bg-gray-100 rounded p-2 m-2 shadow-inner cursor-pointer"
            onClick={() => handleChildClick(child)}
          >
            {child.data.label}
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
