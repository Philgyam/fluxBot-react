import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge as rfAddEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FaTrashAlt, FaClone } from 'react-icons/fa';
import { IoArrowDownSharp, IoArrowUpSharp } from 'react-icons/io5';
import GroupNode from './GroupNode';
import { ImFileEmpty } from 'react-icons/im';
import { CiVideoOn } from 'react-icons/ci';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineDeploymentUnit, AiOutlineFileText, AiOutlineAudio } from 'react-icons/ai';
import { FaImage } from 'react-icons/fa';

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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showPane, setShowPane] = useState(false);
  const [paneItems, setPaneItems] = useState([
    { id: '0', icon: <AiOutlineFileText />, label: 'Text' },
    { id: '1', icon: <IoLocationSharp />, label: 'Location' },
    { id: '2', icon: <ImFileEmpty />, label: 'File' },
    { id: '3', icon: <AiOutlineAudio />, label: 'Audio' },
    { id: '4', icon: <CiVideoOn />, label: 'Video' },
    { id: '5', icon: <AiOutlineDeploymentUnit />, label: 'Carousel' },
    { id: '6', icon: <FaImage />, label: 'Image' },
  ]);

  const togglePane = () => {
    setShowPane((prevShowPane) => !prevShowPane);
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
    setContextMenu({
      mouseX: event.clientX - 4,
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

  const addGroupNode = (position) => {
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
      position: position || { x: Math.random() * 400, y: Math.random() * 400 },
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

  // Drag-and-drop functionality
  const [activeCard, setActiveCard] = useState(null);
  const [showDrop, setShowDrop] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setShowDrop(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    setShowDrop(false);
  
    // Check if the drop target has the ID 'flow-area'
    const targetElement = event.currentTarget;
    if (targetElement.id === 'flow-area') {
      // Calculate the drop position relative to the ReactFlow container
      const containerRect = targetElement.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;
  
      // Call the function to add a new node
      addGroupNode({ x, y });
    } else {
      // Do nothing if the drop target doesn't have the ID 'flow-area'
      console.log('Drop target is not the flow area.');
    }
  };
  

  return (
    <div
      style={{ height: '100vh', position: 'relative' }}
      className="bg-gray-900 h-full flex transition-all duration-300"
      onClick={() => setContextMenu(null)}
      onDragOver={handleDragOver}
     
    >
      <div className="absolute top-0 left-0 p-2 space-x-2 z-10">
        <button
          onClick={() => addGroupNode()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Node
        </button>
        <button onClick={togglePane}>
          {showPane ? <IoArrowUpSharp style={{ color: 'white' }} /> : <IoArrowDownSharp style={{ color: 'white' }} />}
        </button>
      </div>
      <div   style={{ height: '100%', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          className="w-full h-full"
          nodeTypes={nodeTypes}
          style={{ height: '100%', width: '100%' }}
          onDrop={handleDrop}
          id='flow-area'
        >
          <Controls position="top-right" />
          <Background />
        </ReactFlow>
      </div>
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
        <div className="absolute top-0 left-0 z-50">
          <div className="absolute px-4 drops gap-3 top-[4rem] flex flex-col justify-around items-start py-5 bg-[#222831] w-[20rem] h-[40rem] z-[1000] text-white">
            <div className="w-full h-full rounded-xl pt-2 pb-2 pl-2 pr-2 border-2 border-white">
              <h2 className="text-lg font-bold mb-4">Message Cards</h2>
              <div className="grid grid-cols-3 gap-2">
                {paneItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => setActiveCard(item.label)}
                    onDragEnd={() => setActiveCard(null)}
                    className="flex cursor-grab items-center bg-gray-700 text-white p-2 rounded"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <h1>{activeCard ? `Dragging: ${activeCard}` : 'No card dragged'}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flow;
