class Productos {
    constructor() {
      this.productos = [];
    }
  
    getProducts() {
      return this.productos;
    }
  
    getProductById(id) {
      const result = this.productos.filter(prod => prod.id === id);
      if (result.length !== 0) {
        return result;
      } else {
        return { error: 'producto no encontrado' };
      }
    }
  
    setProduct(newProduct) {
      let id;
      if (this.productos.length === 0) {
        id = 1;
      } else {
        id = this.productos[this.productos.length - 1].id + 1;
      }
      this.productos.push({ id, ...newProduct });
      return { id, ...newProduct };
    }
  
    modifyProduct(id, modProduct) {
      const modifying = this.productos.find(prod => prod.id === id);
      if (modifying === undefined) return { error: 'producto no encontrado' };
      const i = this.productos.indexOf(modifying);
      this.productos[i] = { ...modifying, ...modProduct };
    }
  
    deleteProduct(id) {
      const i = this.productos.findIndex(prod => prod.id === id);
      if (i === -1) return { error: 'producto no encontrado' };
      this.productos.splice(i, 1);
    }
  }
  
  module.exports = Productos;