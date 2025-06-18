import React from 'react';
import { CollaborationStatusProps } from './types';

const CollaborationStatus: React.FC<CollaborationStatusProps> = ({
  isConnected,
  connectedUsers,
  roomId,
  userName
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
      <h3 className="font-semibold text-gray-800 mb-3">Collaboration Status</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span>Connection:</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Active Users:</span>
          <span className="text-blue-600 font-semibold">{connectedUsers}</span>
        </div>
        <div className="flex justify-between">
          <span>Room:</span>
          <span className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
            {roomId}
          </span>
        </div>
        <div className="flex justify-between">
          <span>You:</span>
          <span className="text-purple-600 font-medium">{userName}</span>
        </div>
      </div>
      
      {!isConnected && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          <strong>Note:</strong> You're working offline. Changes will sync when connection is restored.
        </div>
      )}
    </div>
  );
};

export default CollaborationStatus;