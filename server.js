const express = require('express');
const Productos = require('./productos');
const Mensajes = require('./mensajes');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
const productos = new Productos();
const mensajes = new Mensajes();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


io.on('connection', async socket => {
  console.log('usuario conectado');

  socket.emit('productosList', productos.getProducts());
  socket.emit('mensajes', await mensajes.getMsjs())

  socket.on('saveProduct', product => {
    productos.setProduct(product);
    const result = productos.getProducts();
    io.sockets.emit('productosList', result);
  })

  socket.on('mensaje', async msj => {
    await mensajes.saveMsj(msj);
    io.sockets.emit('mensajes', await mensajes.getMsjs())
  })

})


// app.get('/productos', (req, res) => {
//   const products = productos.getProducts();
//   const hayProductos = products.length > 0 ? true : false;
//   res.render('productos', { products, hayProductos })
// })

app.post('/', (req, res) => {
  const newProduct = req.body;
  productos.setProduct(newProduct);

})

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => console.log(`Server ready on ${PORT}`));
server.on('error', error => console.log(`Error en servidor: ${error}`))