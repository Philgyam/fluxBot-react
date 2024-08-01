import React, { useState, useCallback } from 'react';
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import ReactFlow, {
  Controls,
  Background,
  addEdge as rfAddEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FaTrashAlt, FaClone } from 'react-icons/fa';
import { Handle, Position } from 'reactflow';
import { IoIosAddCircleOutline } from "react-icons/io";
import { DndContext, useDroppable } from '@dnd-kit/core';
import { ImFileEmpty } from 'react-icons/im';
import { CiVideoOn } from 'react-icons/ci';
import { closestCorners } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';


/// PANE ITEMS//////

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

function DroppableDiv() {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable-div',
  });

  return (
    <div
      ref={setNodeRef}
      className={`border-2 border-dashed rounded-sm p-4 ${isOver ? 'bg-blue-100' : 'bg-gray-100'} mt-4`}
      style={{ minHeight: '100px' }}
    >
      Drop items here
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

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  groupNode: GroupNode,
};

function Flow() {
  const { setNodeRef } = useDroppable({
    id: 'flow-area',
  });
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showPane, setShowPane] = useState(false);

  const togglePane = () => {
    setShowPane((prevShowPane) => !prevShowPane);
  };

  const handleChildClick = (child) => {
    console.log('Child clicked:', child);
    togglePane(); // Toggle pane when a child is clicked
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
    setContextMenu({
      mouseX: event.clientX - -4,
      mouseY: event.clientY - 4,
    });
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => rfAddEdge(params, eds)),
    []
  );

  const addGroupNode = () => {
    const newNodeId = `node-${nodes.length + 1}`;
    const newChildId = `node-${nodes.length + 2}`;
    const newNode = {
      id: newNodeId,
      type: 'groupNode',
      data: {
        label: `Group ${nodes.length + 1}`,
        children: [
          {
            id: newChildId,
            data: { label: `Child ${nodes.length + 1}` },
          },
        ],
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setSelectedNode(null);
    }
  };

  const duplicateNode = () => {
    if (selectedNode) {
      const newNode = {
        ...selectedNode,
        id: `node-${nodes.length + 1}`,
        position: {
          x: selectedNode.position.x + 100 + Math.random() * 20 - 10,
          y: selectedNode.position.y + 100 + Math.random() * 20 - 10,
        },
      };
      setNodes((nds) => [...nds, newNode]);
      setSelectedNode(newNode);
    }
  };

  const handleContextMenuAction = (action) => {
    switch (action) {
      case 'delete':
        deleteNode();
        break;
      case 'duplicate':
        duplicateNode();
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{ height: '100vh', position: 'relative' }}
      className="bg-gray-900 h-full flex transition-all duration-300"
      onClick={() => setContextMenu(null)}
    >
      <div className="absolute top-0 left-0 p-2 space-x-2 z-10">
        <button
          onClick={addGroupNode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Node
        </button>

        <button onClick={togglePane} className=''>
          {showPane ? <IoArrowUpSharp style={{ color: 'white' }} /> : <IoArrowDownSharp style={{ color: 'white' }} />}
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        className="w-full h-full"
        nodeTypes={nodeTypes}
      >
        <Controls position="top-right" />
        <Background />
      </ReactFlow>
      {contextMenu && (
        <div
          className="absolute bg-gray-700 text-white rounded-md border border-gray-800 shadow-lg p-2"
          style={{
            left: contextMenu.mouseX,
            top: contextMenu.mouseY,
          }}
        >
          <button
            onClick={() => handleContextMenuAction('delete')}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-red-600 hover:text-white transition duration-300"
          >
            <FaTrashAlt /> {/* Icon */}
            <span>Delete Node</span>
          </button>
          <button
            onClick={() => handleContextMenuAction('duplicate')}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-blue-600 hover:text-white transition duration-300 mt-2"
          >
            <FaClone /> {/* Icon */}
            <span>Duplicate Node</span>
          </button>
        </div>
      )}
      {showPane && (
        <Pane />
      )}
    </div>
  );
}

function GroupNode({ data, onAddChild, onChildClick }) {
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
    if (onAddChild) onAddChild(); // Call the prop function to toggle the pane
  };

  const handleChildClick = (child) => {
    console.log('Child clicked:', child);
    if (onChildClick) onChildClick(child);
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
      <button className='absolute bottom-1 left-0 right-0 mx-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center' onClick={handleAddChild}>
        <IoIosAddCircleOutline style={{ color: 'white' }} />
      </button>
    </div>
  );
}

function App() {
  return (
    <DndContext>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </DndContext>
  );
}

export default App;
