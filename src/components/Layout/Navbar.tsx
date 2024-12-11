import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">CryptoTrade</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Trade
              </Link>
              <Link to="/wallet" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Wallet
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {user?.name.charAt(0)}
              </div>
              <button 
                onClick={logout}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};