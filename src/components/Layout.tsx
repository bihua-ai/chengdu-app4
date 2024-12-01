import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import MatrixChat from './MatrixChat';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const [chatHeight, setChatHeight] = useState(300);
  const [isChatResizing, setIsChatResizing] = useState(false);
  const { logout } = useAuth();

  const handleMouseUp = () => {
    setIsChatResizing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isChatResizing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newHeight = rect.bottom - e.clientY;
      if (newHeight >= 200 && newHeight <= 600) {
        setChatHeight(newHeight);
      }
    }
  };

  const handleChatResizeStart = (e: React.MouseEvent) => {
    setIsChatResizing(true);
    e.preventDefault();
  };

  return (
    <div 
      className="flex flex-col h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/src/assets/bihua.png" alt="笔画" className="h-8 w-8" />
            <span className="ml-2 text-2xl font-bold text-gray-900">笔画</span>
          </div>
          
          <button
            onClick={logout}
            className="p-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md"
            title="退出登录"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      <div
        className="h-1 bg-gray-200 hover:bg-indigo-400 cursor-row-resize relative group"
        onMouseDown={handleChatResizeStart}
      >
        <div className="absolute inset-x-0 -top-1 -bottom-1 group-hover:bg-indigo-400/10" />
      </div>

      <div style={{ height: chatHeight }} className="flex-shrink-0 bg-white border-t border-gray-200">
        <MatrixChat />
      </div>
    </div>
  );
}