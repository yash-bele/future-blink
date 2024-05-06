import { nanoid } from "nanoid";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import ReactFlow, { ReactFlowProvider, useReactFlow, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import data from "./data";
import CustomNode from "./components/CustomNode";
import { useGetUserQuery, useUpdateUserMutation } from "./store/api";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, createNode } from "./store/appSlice";
const proOptions = { hideAttribution: true };
const nodeTypes = { custom: CustomNode };

function Flow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reactFlowInstance = useReactFlow();
  const { isLoading: fetchLoading, isSuccess: fetchSuccess, data: userData } = useGetUserQuery();
  const [updateUser, { isLoading: updateLoading, isSuccess: updateSuccess }] = useUpdateUserMutation();
  const { nodes, edges } = useSelector((store) => store.app);

  const handleAddNode = useCallback(() => {
    const lastNodePosition = reactFlowInstance.getNodes().at(-1)?.position || { x: 0, y: 0 };
    const newNode = { id: nanoid(), position: { x: lastNodePosition.x, y: lastNodePosition.y + 125 }, data, type: "custom" };
    dispatch(createNode(newNode));
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(setToken(null));
    localStorage.clear();
    navigate("/");
  }, []);

  useEffect(() => {
    dispatch(setNodes(userData?.nodes));
    dispatch(setEdges(userData?.edges));
  }, [fetchSuccess]);

  return (
    <main className="w-screen h-screen">
      {fetchLoading ? (
        <div className="w-screen h-screen grid place-items-center">
          <Icon icon="ei:spinner" width={250} className="animate-spin text-blue-200" />
        </div>
      ) : (
        <>
          <ReactFlow
            fitView
            maxZoom={1}
            proOptions={proOptions}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={(e) => dispatch(onNodesChange(e))}
            onEdgesChange={(e) => dispatch(onEdgesChange(e))}
            onConnect={(e) => dispatch(onConnect(e))}
          >
            <Background />
            <Controls />
          </ReactFlow>
          <div className="absolute top-5 right-5 flex items-center space-x-2.5">
            <button onClick={handleAddNode} className="bg-blue-400 hover:bg-blue-500 duration-100 text-white shadow pl-2.5 pr-5 py-2 rounded-lg font-medium text-sm flex items-center space-x-1 active:scale-95">
              <Icon icon="material-symbols-light:add-ad-outline-rounded" width={25} />
              <span>Add Node</span>
            </button>
            <button
              disabled={updateLoading}
              onClick={() => updateUser({ nodes, edges })}
              className={`disabled:cursor-not-allowed duration-100 text-white shadow pl-2.5 pr-5 py-2 rounded-lg font-medium text-sm flex items-center space-x-1 active:scale-95 ${updateLoading ? "bg-blue-300" : "bg-blue-400 hover:bg-blue-500"}`}
            >
              {updateLoading ? <Icon icon="ei:spinner-3" width={25} className="animate-spin" /> : <Icon icon="material-symbols-light:bookmark-added-outline-rounded" width={25} />}
              <span>Save</span>
            </button>
            <button onClick={handleLogout} className="bg-red-100 hover:bg-red-200 duration-100 text-red-500 border border-red-500 shadow w-10 aspect-square rounded-full font-medium grid place-items-center space-x-1">
              <Icon icon="icons8:shutdown" width={25} />
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
