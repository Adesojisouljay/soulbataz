import React, { useState } from 'react';
import './orders.css';

export const OrderList = () => {
  const [selectedOrderImages, setSelectedOrderImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (images) => {
    setSelectedOrderImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const orders = [
    { 
      id: 1, 
      status: 'Pending', 
      dateTime: '2024-02-14T10:30:00',
      products: [
        { type: 'Shoes', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQKQxCQehj4wJDY5IOwgffuVz437RD-GIMg&usqp=CAU', count: 2, price: 50 },
        { type: 'Half shoe', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNd8mHP4iLnCbXyWSjR3OH6tDrlBrHUtgYw&usqp=CAU', count: 1, price: 20 },
        { type: 'Half shoe', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJvxQy3qhTQoBNRGHKZuTGivCIpmSYL3Kaiw&usqp=CAU', count: 1, price: 60 }
      ]
    },
    { 
      id: 2, 
      status: 'Completed', 
      dateTime: '2024-02-15T12:45:00',
      products: [
        { type: 'Shoe', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Tc-D_uw2yJR9xoqGyAEvZPHuJVrWWIu_5Q&usqp=CAU', count: 1, price: 30 },
        { type: 'Jeans', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8DB-MSqyAcZhzqExwCyTTPmkpPIadxi_T2A&usqp=CAU', count: 2, price: 25 }
      ]
    },
    { 
      id: 3, 
      status: 'Failed', 
      dateTime: '2024-02-16T09:15:00',
      products: [
        { type: 'Sunglasses', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj5cdYYZ_K7I4Wujb-AE_LC-n3h6aZzWys_g&usqp=CAU', count: 3, price: 40 }
      ]
    },
    { 
      id: 4, 
      status: 'Pending', 
      dateTime: '2024-02-17T14:20:00',
      products: [
        { type: 'T-shirt', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hKuRBAB309QriU92LfaW_4QheVFu1QN6xg&usqp=CAU', count: 3, price: 15 },
        { type: 'Sunglasses', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj5cdYYZ_K7I4Wujb-AE_LC-n3h6aZzWys_g&usqp=CAU', count: 3, price: 40 },
        { type: 'Hoodie', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWv4ilqF6wS9gKHUp7a1rks04GmVpAwqlHg&usqp=CAU', count: 1, price: 45 },
        { type: 'Hat', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhgmJf0u2ucDyOzQX69PN9mk6AuycmWfI0g&usqp=CAU', count: 1, price: 20 },
        { type: 'Gloves', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgARFdkvvZATIEMeMCw36944aZmVcx_j7ROw&usqp=CAU', count: 2, price: 10 },
        { type: 'Scarf', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWv4ilqF6wS9gKHUp7a1rks04GmVpAwqlHg&usqp=CAU', count: 1, price: 30 },
        { type: 'Shoes', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQKQxCQehj4wJDY5IOwgffuVz437RD-GIMg&usqp=CAU', count: 2, price: 50 },
        { type: 'Half shoe', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNd8mHP4iLnCbXyWSjR3OH6tDrlBrHUtgYw&usqp=CAU', count: 1, price: 20 },
        { type: 'Half shoe', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJvxQy3qhTQoBNRGHKZuTGivCIpmSYL3Kaiw&usqp=CAU', count: 1, price: 60 }
      ]
    },
    { 
      id: 5, 
      status: 'Completed', 
      dateTime: '2024-02-18T18:00:00',
      products: [
        { type: 'Hoodie', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWv4ilqF6wS9gKHUp7a1rks04GmVpAwqlHg&usqp=CAU', count: 1, price: 45 }
      ]
    },
    { 
      id: 6, 
      status: 'Failed', 
      dateTime: '2024-02-19T09:45:00',
      products: [
        { type: 'Hat', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhgmJf0u2ucDyOzQX69PN9mk6AuycmWfI0g&usqp=CAU', count: 1, price: 20 },
        { type: 'Gloves', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgARFdkvvZATIEMeMCw36944aZmVcx_j7ROw&usqp=CAU', count: 2, price: 10 },
        { type: 'Scarf', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWv4ilqF6wS9gKHUp7a1rks04GmVpAwqlHg&usqp=CAU', count: 1, price: 30 }
      ]
    },
    { 
      id: 7, 
      status: 'Pending', 
      dateTime: '2024-02-20T11:10:00',
      products: [
        { type: 'Socks', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVJz8nuntUkOZweWf4qDHEdwF5PdlKfqnNg&usqp=CAU', count: 4, price: 5 },
        { type: 'Underwear', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlFG-eeXZXTyOHUcHqHpEr9dwFOgxWT0QKg&usqp=CAU', count: 1, price: 12 }
      ]
    }
  ];
  

  return (
    <div className="order-list-container">
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order-item">
          <div className="product-list">
            {order.products.map((product, index) => (
                <div key={index} className="product-item">
                {index === 0 && (
                  <img src={product.imageUrl} alt={product.type} className="product-image" />
                  )}
                  <div className="order-info">
                    {index === 0 && order.products.length > 1 && (
                        <span className="product-count" onClick={() => openModal(order.products.map(prod => prod.imageUrl))}>+{order.products.length - 1} more</span>
                        )}
                    {index === 0 && (
                    <span className="product-type">{product.type}</span>
                    )}
                  </div>
              </div>
            ))}
          </div>
          <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
          <div className="order-date">{new Date(order.dateTime).toLocaleString()}</div>
          <div className="order-total">Payment made: ${order.products.reduce((total, product) => total + (product.count * product.price), 0)}</div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-images">
              {selectedOrderImages.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index + 1}`} className="modal-image" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
