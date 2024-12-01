import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MatrixChat from './MatrixChat';

export default function Sidebar() {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div className="h-full flex flex-col">
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

      <div className="flex-1 overflow-hidden">
        <MatrixChat />
      </div>
    </div>
  );
}