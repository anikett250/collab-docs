// server.js
import { WebSocketServer } from 'ws'
import * as http from 'http'
import { setupWSConnection } from 'y-websocket/server'

const server = http.createServer()
const wss = new WebSocketServer({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req)
})

const port = 1234
server.listen(port)

console.log(`✅ Yjs WebSocket server running at ws://localhost:${port}`)
