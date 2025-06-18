export interface User {
  id: string;
  name: string;
  color: string;
}

export interface EditorProps {
  roomId: string;
  userName: string;
  onRoomChange: (roomId: string) => void;
  onUserNameChange: (userName: string) => void;
}

export interface HeaderProps {
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
  isConnected: boolean;
  connectedUsers: number;
  lastSaved: Date | null;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  onSave: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export interface SettingsPanelProps {
  roomId: string;
  userName: string;
  showSettings: boolean;
  onRoomChange: (roomId: string) => void;
  onUserNameChange: (userName: string) => void;
  onClose: () => void;
}

export interface CollaborationStatusProps {
  isConnected: boolean;
  connectedUsers: number;
  roomId: string;
  userName: string;
}

export interface EditorState {
  isConnected: boolean;
  connectedUsers: number;
  documentTitle: string;
  lastSaved: Date | null;
  roomId: string;
  userName: string;
  showSettings: boolean;
}