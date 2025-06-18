"use client";

import dynamic from "next/dynamic";

// Lazy-load the CollaborativeEditor component with SSR disabled
const CollaborativeEditor = dynamic(() => import("../../components/CollaborativeEditor"), {
  ssr: false,
});

export default function EditorWrapper({ roomId }: { roomId: string }) {
  return <CollaborativeEditor roomId={roomId} />;
}