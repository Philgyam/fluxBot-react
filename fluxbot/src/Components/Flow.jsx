import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  addEdge as rfAddEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FaTrashAlt, FaClone } from 'react-icons/fa';
import GroupNode from './GroupNode';

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

function Flow({ isExpanded }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showPane, setShowPane] = useState(false);



  const togglePane = () => {
    setShowPane(!showPane);
  };

  const closePane = () => {
    setShowPane(false);
  };


  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
    setContextMenu({
      mouseX: event.clientX - 2,
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

  const addEdgeManually = (source, target) => {
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);
  
    if (sourceNode && targetNode) {
      const newEdge = {
        id: `edge-${edges.length + 1}`,
        source: source,
        target: target,
        type: 'default',
        data: { label: `Edge ${edges.length + 1}` },
      };
  
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
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
    <>
     {showPane && (
        <Pane/>
      )}
    <div
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
        <button
          onClick={() => addEdgeManually('1', '2')}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Edge
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
    </div>
    </>
  );
}

export default Flow;
