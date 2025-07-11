import React from 'react';
import { Download, Upload, Zap, Search, Bell, Settings, User, Plus } from 'lucide-react';

interface TopBarProps {
  onImport: () => void;
  onScrape: () => void;
  onExport: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onImport, onScrape, onExport }) => {
  return (
    <header className="bg-[#1E2328] border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads, companies, or contacts..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0F1419] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 ml-6">
          <button
            onClick={onScrape}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2" />
            Smart Scrape
          </button>
          
          <button
            onClick={onImport}
            className="flex items-center px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          
          <button className="flex items-center px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-yellow-600 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
          
          {/* Notification and Profile */}
          <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-600">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-[#2A2D31] rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2D31] rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center p-2 text-gray-400 hover:text-white hover:bg-[#2A2D31] rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-[#2563EB] to-[#6366F1] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};