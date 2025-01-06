'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  async function handleAddOrUpdateProduct(e: React.FormEvent) {
    e.preventDefault();

    const url = '/api/products';
    const method = editingProductId ? 'PUT' : 'POST';

    const body = JSON.stringify(
      editingProductId
        ? { id: editingProductId, ...newProduct }
        : newProduct
    );

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (response.ok) {
        if (editingProductId) {
          setProducts((prev) =>
            prev.map((product) =>
              product._id === editingProductId ? { ...product, ...newProduct } : product
            )
          );
        } else {
          const addedProduct = await response.json();
          setProducts((prev) => [...prev, addedProduct]);
        }

        setNewProduct({ name: '', description: '', price: '' });
        setEditingProductId(null);
      }
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }

  function handleEditProduct(product: any) {
    setNewProduct({ name: product.name, description: product.description, price: product.price });
    setEditingProductId(product._id);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  }

  return (
    <div className="p-4">
      <Link href="/">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Volver al Inicio
        </button>
      </Link>
      <h2 className="text-2xl font-bold">{editingProductId ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleAddOrUpdateProduct} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingProductId ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        {editingProductId && (
          <button
            type="button"
            onClick={() => setEditingProductId(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar Edición
          </button>
        )}
      </form>

      <h2 className="text-2xl font-bold mt-6">Lista de Productos</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
