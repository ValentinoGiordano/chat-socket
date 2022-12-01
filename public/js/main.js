const socket = io.connect();

const formProductos = document.getElementById('formProductos');
const tablaProductos = document.getElementById('productos');

formProductos.addEventListener('submit', e => {
  e.preventDefault();
  const producto = {
    title: e.target[0].value,
    price: parseInt(e.target[1].value),
    img: e.target[2].value
  }
  socket.emit('saveProduct', producto);
})

socket.on('productosList', async productos => {
  const html = await makeHtmlTable(productos);
  tablaProductos.innerHTML = html;
})

function makeHtmlTable(products) {
  return fetch('views/productos.hbs')
    .then(respuesta => respuesta.text())
    .then(plantilla => {
      const template = Handlebars.compile(plantilla);
      const html = template({ products });
      return html;
    })
}


const mensajes = document.getElementById('mensajes');
const username = document.getElementById('username');
const mensaje = document.getElementById('mensaje');
const btn = document.getElementById('btnEnviar');
const formMensaje = document.getElementById('formPublicarMensaje');

function render(data) {
  const html = data.map((msj) => {
    return (`
      <div>
        <p class="text-break">
        <strong class="text-primary">${msj.user}</strong>
        <span style="color: brown">[${msj.date}] : </span>
        <span class="fst-italic text-success">${msj.message}</span>
        </p>
      </div>`
    )
  }).join(' ');
  return html;
}

formMensaje.addEventListener('submit', e => {
  e.preventDefault();
  const msj = {
    user: username.value,
    message: mensaje.value,
    date: new Date().toLocaleString()
  }

  socket.emit('mensaje', msj);
  formMensaje.reset();
})

socket.on('mensajes', msjs => {
  mensajes.innerHTML = render(msjs);
})



username.addEventListener('input', () => {
  const hayMail = username.value.length;
  const hayMsj = mensaje.value.length;
  mensaje.disabled = !hayMail;
  btn.disabled = !hayMail || !hayMsj;
})

mensaje.addEventListener('input', () => {
  const hayMsj = mensaje.value.length;
  btn.disabled = !hayMsj;
})