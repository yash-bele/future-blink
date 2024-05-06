import { createSlice } from "@reduxjs/toolkit";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

const initialState = { token: null, nodes: [], edges: [] };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setNodes: (state, { payload }) => {
      state.nodes = payload;
    },
    setEdges: (state, { payload }) => {
      state.edges = payload;
    },
    onNodesChange: (state, { payload }) => {
      state.nodes = applyNodeChanges(payload, state.nodes);
    },
    onEdgesChange: (state, { payload }) => {
      state.edges = applyEdgeChanges(payload, state.edges);
    },
    onConnect: (state, { payload }) => {
      state.edges = addEdge(payload, state.edges);
    },
    createNode: (state, { payload }) => {
      state.nodes = [...state.nodes, payload];
    },
    updateNode: (state, { payload }) => {
      const { nodeId, node } = payload;
      state.nodes = state.nodes?.map((i) => (i.id === nodeId ? { ...i, data: node } : i));
    },
  },
});

export default appSlice.reducer;
export const { setToken, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, createNode, updateNode } = appSlice.actions;
