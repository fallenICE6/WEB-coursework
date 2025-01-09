import React, { useState, useEffect } from 'react';
import styles from './Services.module.css';
import { useUser } from '../../UserContext';

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '', // Изменено
    LongDescription: '', // Изменено
  });
  const { user } = useUser();

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://localhost:5000/services');
      const data = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  const addToCart = async (serviceId) => {
    if (!user) {
      alert("Пожалуйста, войдите в свою учетную запись!");
      return;
    }

    const response = await fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ userId: user.id, serviceId }),
    });

    if (response.ok) {
      alert("Услуга добавлена в корзину!");
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsEditing(false);
    setIsAdding(false);
    setFormData({ title: '', price: '', description: '', LongDescription: '' }); // Сбрасываем форму
  };

  const openEditModal = (service) => {
    setIsEditing(true);
    setSelectedService(service);
    setFormData({
      title: service.title,
      price: service.price,
      description: service.description, // Изменено
      LongDescription: service.LongDescription // Изменено
    });
  };

  const openAddModal = () => {
    setIsAdding(true);
    setSelectedService(null); // Убираем выделение существующей услуги
    setFormData({ title: '', price: '', description: '', LongDescription: '' }); // Сбрасываем форму
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (isAdding) {
      const response = await fetch('http://localhost:5000/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const newService = await response.json();
        setServices([...services, newService]);
        closeModal();
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error}`);
      }
    } else if (isEditing && selectedService) {
      const response = await fetch(`http://localhost:5000/services/${selectedService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedService = await response.json();
        setServices(services.map(service => 
          service.id === updatedService.id ? updatedService : service
        ));
        closeModal();
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error}`);
      }
    }
  };

  const deleteService = async (serviceId) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту услугу?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/services/${serviceId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setServices(services.filter(service => service.id !== serviceId)); // Обновляем список услуг
        } else {
          const error = await response.json();
          alert(error.error);
        }
      } catch (error) {
        console.error("Ошибка удаления услуги:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.servicesContainer}>
        <h2 className={styles.shadowText}>Сделаем Вашу Идею Видимой</h2>
        <h2>Наши Услуги</h2>
        <hr className={styles.separator} />
        <div className={styles.servicesList}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceBlock}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={styles.buttonContainer}>
                <button onClick={() => handleServiceClick(service)}>Подробнее</button>
                {user && user.role === 'ADMIN' && (
                  <>
                    <button onClick={() => openEditModal(service)} className={styles.editButton}>
                      Редактировать
                    </button>
                    <button 
                      onClick={() => deleteService(service.id)} 
                      className={styles.deleteButton}
                    >
                      Удалить
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {user && user.role === 'ADMIN' && (
            <div className={styles.addservicesContainer}>
              <h3 className={styles.title}> Добавить новую услугу</h3>
              <div className={styles.addButtonStyle}>
                <button onClick={openAddModal} className={styles.addButton}>+</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedService && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.LongDescription}</p>
            <p className={styles.price}>Цена: {selectedService.price}₽</p>
            <div className={styles.button}>
              <button onClick={() => addToCart(selectedService.id)}>Оформить</button>
            </div>
          </div>
        </div>
      )}

      {(isEditing || isAdding) && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>{isAdding ? "Добавить новую услугу" : "Редактировать услугу"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Название услуги"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Цена"
                required
              />
              <textarea
                name="description" // Изменено
                value={formData.description} // Изменено
                onChange={handleChange}
                placeholder="Краткое описание" // Изменено
                required
              />
              <textarea
                name="LongDescription"
                value={formData.LongDescription}
                onChange={handleChange}
                placeholder="Полное описание" // Изменено
                required
              />
              <div className={styles.button}>
                <button type="submit">{isAdding ? "Добавить" : "Сохранить изменения"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;