import React from "react";
import Sidebar from "../ComponentFinal/Sidebar";

const LayoutDasboard = (props) => {
  return (
    <div>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <Sidebar />
          <div className="flex flex-col w-full md:space-y-4">
            <header className="z-40 flex items-center justify-between w-full h-16 bg-blue-100"></header>
            <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutDasboard;
