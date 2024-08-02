import React, { useState } from 'react';
import { ImFileEmpty } from 'react-icons/im';
import { CiVideoOn } from 'react-icons/ci';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableItem({ id, icon, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-2 border-white w-full rounded-sm p-2 flex items-center gap-2"
    >
      {icon}
      {label}
    </div>
  );
}

function DroppableDiv({ onDrop }) {
  const { setNodeRef } = useDroppable({
    id: 'droppable-div',
  });

  return (
    <div
      ref={setNodeRef}
      className='h-[4rem] w-full bg-green-100'
      onDragOver={(e) => e.preventDefault()} // Necessary to allow dropping
      onDrop={(e) => {
        e.preventDefault();
        const droppedItemId = e.dataTransfer.getData('text/plain');
        onDrop(droppedItemId); // Pass the dropped item ID to the handler
      }}
    >
      {/* Droppable area */}
    </div>
  );
}

function Pane() {
  const [paneItems] = useState([
    { id: '0', icon: <AiOutlineFileText />, label: 'Text' },
    { id: '1', icon: <IoLocationSharp />, label: 'Location' },
    { id: '2', icon: <ImFileEmpty />, label: 'File' },
    { id: '3', icon: <AiOutlineAudio />, label: 'Audio' },
    { id: '4', icon: <CiVideoOn />, label: 'Video' },
    { id: '5', icon: <AiOutlineDeploymentUnit />, label: 'Carousel' },
    { id: '6', icon: <FaImage />, label: 'Image' },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (id) => {
    const droppedItem = paneItems.find(item => item.id === id);
  console.log('hello')
  };

  return (
    <DndContext onDragEnd={(event) => handleDrop(event.active.id)}>
      <div className="absolute px-4 drops gap-3 top-[4rem] flex flex-col justify-around items-start py-5 bg-[#222831] w-[20rem] h-[40rem] z-[1000] text-white">
        <div className="w-full h-full rounded-xl pt-2 pb-2 pl-2 pr-2 border-2 border-white">
          <h2 className="text-lg font-bold mb-4">Message Cards</h2>
          <div className="grid grid-cols-3 gap-2">
            {paneItems.map((item) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>
          <DroppableDiv onDrop={handleDrop} />
        </div>
        {/* Render dropped items */}
        <div className="mt-4">
          {droppedItems.map((item, index) => (
            <div key={index} className="border-2 border-white w-full rounded-sm p-2 flex items-center gap-2">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default Pane;
