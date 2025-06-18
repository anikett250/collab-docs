'use client';

import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import Header from './Header';
import SettingsPanel from './SettingsPanel';
import CollaborationStatus from './CollaborationStatus';
import { useEditor } from './useEditor';
import { useAutoSave } from './useAutoSave';
import { 
  getRoomFromUrl, 
  updateUrlWithRoom, 
  generateRandomUserName, 
  copyToClipboard, 
  downloadHtmlContent 
} from './utils';
import { editorStyles } from './quillConfig';

const CollaborativeEditor: React.FC = () => {
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [roomId, setRoomId] = useState('demo-room');
  const [userName, setUserName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Initialize room and user name
  useEffect(() => {
    const roomFromUrl = getRoomFromUrl();
    if (roomFromUrl) {
      setRoomId(roomFromUrl);
    }

    if (!userName) {
      setUserName(generateRandomUserName());
    }
  }, [userName]);

  // Initialize editor
  const { editorRef, quillRef, isConnected, connectedUsers, getEditorContent } = useEditor({
    roomId,
    userName
  });

  // Auto-save functionality
  const { lastSaved, manualSave } = useAutoSave({ quillRef });

  const handleRoomChange = (newRoomId: string) => {
    if (newRoomId && newRoomId !== roomId) {
      setRoomId(newRoomId);
      updateUrlWithRoom(newRoomId);
    }
  };

  const handleSave = () => {
    manualSave();
    alert('Document saved!');
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?room=${roomId}`;
    const copied = await copyToClipboard(shareUrl);
    
    if (copied) {
      alert('Share link copied to clipboard!');
    } else {
      prompt('Copy this share link:', shareUrl);
    }
  };

  const handleDownload = () => {
    const content = getEditorContent();
    downloadHtmlContent(content, documentTitle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        documentTitle={documentTitle}
        setDocumentTitle={setDocumentTitle}
        isConnected={isConnected}
        connectedUsers={connectedUsers}
        lastSaved={lastSaved}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        onSave={handleSave}
        onShare={handleShare}
        onDownload={handleDownload}
      />

      {/* Settings Panel */}
      <SettingsPanel
        roomId={roomId}
        userName={userName}
        showSettings={showSettings}
        onRoomChange={handleRoomChange}
        onUserNameChange={setUserName}
        onClose={() => setShowSettings(false)}
      />

      {/* Editor Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Quill Editor */}
          <div 
            ref={editorRef}
            className="min-h-[600px]"
            style={editorStyles}
          />
        </div>
      </div>

      {/* Collaboration Status Panel */}
      <CollaborationStatus
        isConnected={isConnected}
        connectedUsers={connectedUsers}
        roomId={roomId}
        userName={userName}
      />

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-4 left-4 md:hidden">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CollaborativeEditor;