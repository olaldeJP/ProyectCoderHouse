// import { managerProducts } from "../dao/services/productManager.js";

import { productsMongoose } from "../services/index.js";
import { messageMongoose } from "../services/index.js";

export function onConnection(socketServer) {
  return async function (socket) {
    console.log("se conectó " + socket.id);
    socket.broadcast.emit("nuevoUsuario", socket.id);
    //forma con FileSystem:
    //   socket.emit("sendProducts", await managerProducts.getProducts());

    //Forma con Mongoose:
    //  socket.emit("sendProducts", await productsMongoose.find().lean());

    socket.on("disconnecting", () => {
      socket.broadcast.emit("usuarioDesconectado", socket.id);
    });
  };
}

export function inyectarSocketServer(socketServer) {
  return function (req, res, next) {
    res["sendProducts"] = async () => {
      // Forma con FileSystem:  socketServer.emit("sendProducts", await managerProducts.getProducts());
      socketServer.emit("sendProducts", await productsMongoose.find().lean());
    };
    next();
  };
}

export function socketMessage(socketServer) {
  return function (req, res, next) {
    try {
      res["sendMessage"] = async () => {
        // Forma con FileSystem:  socketServer.emit("sendProducts", await managerProducts.getProducts());

        const messages = await messageMongoose.find().lean();

        await socketServer.emit("sendMessage", messages);
      };
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
}
