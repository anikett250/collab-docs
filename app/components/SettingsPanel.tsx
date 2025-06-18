import React from 'react';
import { SettingsPanelProps } from './types';

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  roomId,
  userName,
  showSettings,
  onRoomChange,
  onUserNameChange,
  onClose
}) => {
  if (!showSettings) return null;

  return (
    <div className="max-w-7xl mx-auto mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => onRoomChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
          >
            Close Settings
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Share the room ID with others to collaborate on this document
      </div>
    </div>
  );
};

export default SettingsPanel;