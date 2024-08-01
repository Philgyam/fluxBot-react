import React, { useState } from 'react';
import { ImFileEmpty } from 'react-icons/im';
import { CiVideoOn } from 'react-icons/ci';
import { DndContext, closestCorners, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';

function SortableItem({ id, icon, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-2 border-white w-full rounded-sm p-2 flex items-center gap-2 cursor-pointer"
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
    <div ref={setNodeRef} className='h-[4rem] w-full bg-green-100'>
      {/* Droppable area */}
    </div>
  );
}

function Pane() {
  const [paneItems, setPaneItems] = useState([
    { id: '0', icon: <AiOutlineFileText />, label: 'Text' },
    { id: '1', icon: <IoLocationSharp />, label: 'Location' },
    { id: '2', icon: <ImFileEmpty />, label: 'File' },
    { id: '3', icon: <AiOutlineAudio />, label: 'Audio' },
    { id: '4', icon: <CiVideoOn />, label: 'Video' },
    { id: '5', icon: <AiOutlineDeploymentUnit />, label: 'Carousel' },
    { id: '6', icon: <FaImage />, label: 'Image' },
  ]);

  const [droppedItems, setDroppedItems] = useState([]); // State to keep track of dropped items

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
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="absolute px-4 drops gap-3 top-[4rem] flex flex-col justify-around items-start py-5 bg-[#222831] w-[20rem] h-[40rem] z-[1000] text-white">
        <div className="w-full h-full rounded-xl pt-2 pb-2 pl-2 pr-2 border-2 border-white">
          <h2 className="text-lg font-bold mb-4">Message Cards</h2>
          <div className="grid grid-cols-3 gap-2">
            <SortableContext items={paneItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
              {paneItems.map((item) => (
                <SortableItem key={item.id} id={item.id} icon={item.icon} label={item.label} />
              ))}
            </SortableContext>
          </div>
          <DroppableDiv />
        </div>
        {/* Render dropped items */}
        <div className="mt-4">
          {droppedItems.map((item, index) => (
            <div key={index} className="border-2 border-white w-full rounded-sm p-2 flex items-center gap-2 ">
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