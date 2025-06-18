import dynamic from "next/dynamic"

export const dynamicParams = true

const Editor = dynamic(() => import("@/components/CollaborativeEditor"), { ssr: false })

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const roomId = params.roomId

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Room: {roomId}</h1>
      <Editor roomId={roomId} />
    </div>
  )
}
