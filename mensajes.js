const { promises: fs } = require('fs');

class Mensajes {

  async saveMsj(msj) {
    try {
      const data = await fs.readFile('mensajes.txt', 'utf-8');
      const mensajes = JSON.parse(data);
      mensajes.push(msj);
      await fs.writeFile('mensajes.txt', JSON.stringify(mensajes));
    } catch (error) {
      console.error(`Error al guardar mensaje: ${error}`);
    }
  }

  async getMsjs() {
    try {
      const mensajes = await fs.readFile('mensajes.txt', 'utf-8');
      return JSON.parse(mensajes);
    } catch (error) {
      console.error(`Error al leer los mensajes: ${error}`);
    }
  }

}

module.exports = Mensajes;