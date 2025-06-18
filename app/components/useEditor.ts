import { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import { getRandomColor } from './utils';
import { quillConfig } from './quillConfig';

interface UseEditorProps {
  roomId: string;
  userName: string;
}

export const useEditor = ({ roomId, userName }: UseEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);
  const bindingRef = useRef<QuillBinding | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    if (!editorRef.current) return;

    // Cleanup previous instances first
    if (bindingRef.current) {
      bindingRef.current.destroy();
      bindingRef.current = null;
    }
    if (providerRef.current) {
      providerRef.current.destroy();
      providerRef.current = null;
    }
    if (ydocRef.current) {
      ydocRef.current.destroy();
      ydocRef.current = null;
    }

    // Clear the editor container completely
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }

    // Initialize Yjs document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // Get the shared text type
    const ytext = ydoc.getText('quill');

    // Initialize WebSocket provider with demo server
    const provider = new WebsocketProvider(
      'wss://demos.yjs.dev', // Using Yjs demo server
      roomId,
      ydoc
    );
    providerRef.current = provider;

    // Set user awareness info
    provider.awareness.setLocalStateField('user', {
      name: userName,
      color: getRandomColor(),
    });

    // Initialize Quill editor (only after clearing the container)
    const quill = new Quill(editorRef.current, quillConfig);
    quillRef.current = quill;

    // Create Yjs-Quill binding
    const binding = new QuillBinding(ytext, quill, provider.awareness);
    bindingRef.current = binding;

    // Connection status handlers
    provider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected');
    });

    // Awareness (users) tracking
    provider.awareness.on('change', () => {
      setConnectedUsers(provider.awareness.getStates().size);
    });

    // Cleanup
    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
      if (providerRef.current) {
        providerRef.current.destroy();
        providerRef.current = null;
      }
      if (ydocRef.current) {
        ydocRef.current.destroy();
        ydocRef.current = null;
      }
      // Clear quill reference
      quillRef.current = null;
    };
  }, [roomId, userName]);

  const getEditorContent = (): string => {
    return quillRef.current?.root.innerHTML || '';
  };

  return {
    editorRef,
    quillRef,
    isConnected,
    connectedUsers,
    getEditorContent
  };
};