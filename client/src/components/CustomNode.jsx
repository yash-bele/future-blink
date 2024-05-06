import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, Position, useNodeId, useReactFlow } from "reactflow";
import { Icon } from "@iconify-icon/react";
import { iconsCollection, colorsCollection } from "../data";
import { updateNode } from "../store/appSlice";

export default function CustomNode({ data }) {
  const nodeId = useNodeId();
  const dispatch = useDispatch();
  const { deleteElements } = useReactFlow();
  const [node, setNode] = useState(data);
  const [openIcons, setOpenIcons] = useState(false);
  const [openColors, setOpenColors] = useState(false);

  const handleChange = (param) => (e) => setNode({ ...node, [param]: e.target.value });
  const handleComplementary = (param, payload) => {
    setNode({ ...node, [param]: payload });
    param === "icon" && setOpenIcons(false);
    param === "color" && setOpenColors(false);
  };
  const handleDelete = useCallback(() => deleteElements({ nodes: [{ id: nodeId }] }), []);

  useEffect(() => {
    dispatch(updateNode({ nodeId, node }));
  }, [node]);

  return (
    <main className={`relative w-52 shadow rounded-lg px-2.5 pb-1.5 ${node.colors["bg-50"]}`}>
      {/* *** INPUTS *** */}
      <section>
        <h3 className="ml-5 py-0.5 font-medium">
          <input value={node.title} onChange={handleChange("title")} type="text" spellCheck="false" placeholder="Title..." className="bg-transparent outline-none" />
        </h3>
        <p className="text-sm leading-tight font-medium">
          <textarea value={node.description} onChange={handleChange("description")} rows={3} spellCheck="false" placeholder="Lorem ipsum dolor..." className="w-full bg-transparent outline-none" />
        </p>
      </section>
      {/* *** ICONS *** */}
      <section onClick={() => setOpenIcons(!openIcons)} className={`absolute -top-2 -left-2 w-8 aspect-square rounded-md grid place-items-center border ${node.colors["bg-100"]} ${node.colors["border-300"]} ${node.colors["text-500"]}`}>
        <Icon icon={node.icon} width={24} />
        {openIcons && (
          <div className={`absolute bottom-11 pl-2.5 pt-2.5 w-[136px] flex items-center flex-wrap rounded-lg shadow ${node.colors["bg-50"]}`}>
            {iconsCollection.map((i) => (
              <div key={i} onClick={() => handleComplementary("icon", i)} className={`w-8 aspect-square mr-2.5 mb-2.5 rounded-md grid place-items-center border ${node.colors["bg-100"]} ${node.colors["border-300"]} ${node.colors["text-500"]}`}>
                <Icon key={i} icon={i} width={24} />
              </div>
            ))}
            <span className={`absolute -z-10 -bottom-3 left-0 right-0 mx-auto w-fit border-t-[15px] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent ${node.colors["border-t-100"]}`} />
          </div>
        )}
      </section>
      {/* *** COLORS *** */}
      <section onClick={() => setOpenColors(!openColors)} className={`absolute -top-2 -right-2 w-8 aspect-square rounded-md grid place-items-center border ${node.colors["bg-100"]} ${node.colors["border-300"]} ${node.colors["text-500"]}`}>
        <div className={`w-3 aspect-square rounded-full ${node.colors["bg-500"]}`} />
        {openColors && (
          <div className={`absolute bottom-11 pl-2.5 pt-2.5 w-[136px] flex items-center flex-wrap rounded-lg shadow ${node.colors["bg-50"]}`}>
            {colorsCollection.map((i) => (
              <div key={i["bg-500"]} onClick={() => handleComplementary("colors", i)} className={`w-8 aspect-square mr-2.5 mb-2.5 rounded-md grid place-items-center border ${i["bg-100"]} ${i["border-300"]} ${i["text-500"]}`}>
                <div className={`w-3 aspect-square rounded-full ${i["bg-500"]}`} />
              </div>
            ))}
            <span className={`absolute -z-10 -bottom-3 left-0 right-0 mx-auto w-fit border-t-[15px] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent ${node.colors["border-t-100"]}`} />
          </div>
        )}
      </section>
      {/* *** CLOSE *** */}
      <section onClick={() => handleDelete(nodeId)} className={`absolute -bottom-2 -right-2 w-8 aspect-square rounded-md grid place-items-center border ${node.colors["bg-100"]} ${node.colors["border-300"]} ${node.colors["text-500"]}`}>
        <Icon icon="material-symbols-light:close-rounded" width={24} />
      </section>
      {/* *** HANDLES *** */}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </main>
  );
}
