import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './../../Context/CartContext';

export default function AllOrders() {
  const { userId } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  async function getOrders() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userId) {
      getOrders();
    }
  }, [userId]);

  const handleNext = () => {
    if (currentPage < Math.ceil(orders.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) =>
                order.cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={item.product.imageCover} alt={item.product.title} className="w-10 h-10 rounded-full mr-4" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.product.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.product.category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.product.brand.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-300"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orders.length)} of {orders.length} entries</span>
            <button
              onClick={handleNext}
              disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
              className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
