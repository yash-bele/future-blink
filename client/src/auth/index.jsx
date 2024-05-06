import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <Outlet />
    </div>
  );
}
