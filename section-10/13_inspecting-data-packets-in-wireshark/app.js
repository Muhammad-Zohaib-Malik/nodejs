import { open } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
  const fileHandle = await open("numbers.txt");
  const { size } = await fileHandle.stat();
  const readStream = fileHandle.createReadStream({ highWaterMark: 32 });
  socket.write("HTTP/1.1 200 OKAY\n");
  socket.write("Access-Control-Allow-Origin: *\n\n");
  // socket.write("Content-Type: text/txt; charset=utf-8\n");
  // socket.write(`Content-Length: 3`);
  // socket.write(`\n\n{"name": "Anurag"}`);

  readStream.on("data", (chunk) => {
    socket.write(chunk);
    readStream.pause();
    setTimeout(() => {
      readStream.resume();
    }, 50);
  });

  // readStream.pipe(socket);

  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  socket.on("error", () => {
    console.log("Client Lost");
  });
  console.log("Client Connected", socket.remoteAddress);
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
});
