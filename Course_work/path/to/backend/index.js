const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');  // Импортируем модуль path

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Настройка статической папки для изображений
app.use('/images', express.static(path.join(__dirname, 'images')));

// Получение всех отзывов
app.get('/reviews', async (req, res) => {
  const reviews = await prisma.review.findMany();
  res.json(reviews);
});
app.get('/content-items', async (req, res) => {
  try {
    const contentItems = await prisma.contentItem.findMany();
    res.json(contentItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении контент-элементов' });
  }
});
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Проверяем, что все обязательные поля заполнены
  if (!username || !email || !password) {
      return res.status(400).json({ error: "Имя пользователя, почта и пароль обязательны" });
  }

  // Проверяем, существует ли уже пользователь с таким именем или почтой
  const existingUser = await prisma.user.findFirst({
      where: {
          OR: [
              { username: username },
              { email: email },
          ],
      },
  });

  // Если пользователь существует, возвращаем ошибку
  if (existingUser) {
      return res.status(400).json({ error: "Пользователь с таким именем или почтой уже существует." });
  }

  // Хешируем пароль
  const hashedPassword = await hashPassword(password);

  // Создаем нового пользователя
  const newUser = await prisma.user.create({
      data: {
          username,
          email,
          password: hashedPassword,
          role: "USER",
      },
  });

  // Успешная регистрация, возвращаем нового пользователя (или только сообщение об успехе)
  res.status(201).json({ message: "Регистрация прошла успешно!", user: newUser });
});

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "Неправильный логин или пароль" });
    }

    // Сравниваем введённый пароль с хешем
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ error: "Неправильный логин или пароль" });
    }

    res.json(user); // Возвращаем информацию о пользователе
});

app.post('/admin/create', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
      return res.status(400).json({ error: "Имя пользователя, почта и пароль обязательны" });
  }

  const existingUser = await prisma.user.findFirst({
      where: {
          OR: [
              { username: username },
              { email: email },
          ],
      },
  });

  if (existingUser) {
      return res.status(400).json({ error: "Пользователь уже существует" });
  }

  const hashedPassword = await hashPassword(password); // Хешируем пароль

  const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword, role: "ADMIN" },
  });

  res.status(201).json(newUser); // Отправляем ответ с 201 статусом
});

  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
// Получение портфолио
app.get('/portfolio', async (req, res) => {
  try {
    const projects = await prisma.portfolio.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Не удалось получить проекты" });
  }
});

// Добавление нового отзыва
app.post('/reviews', async (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: "Имя и отзыв обязательны" });
  }

  const newReview = await prisma.review.create({
    data: {
      name,
      comment,
    },
  });

  res.json(newReview);
});

app.delete('/reviews/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedReview = await prisma.review.delete({
          where: { id: Number(id) }, // Здесь нужно убедиться, что id - это число
      });
      res.json({ message: 'Отзыв успешно удален', review: deletedReview });
  } catch (error) {
      console.error('Ошибка удаления отзыва:', error);
      res.status(500).json({ error: 'Ошибка удаления отзыва' });
  }
});
app.get('/services', async (req, res) => {
    const services = await prisma.service.findMany();
    res.json(services);
  });
  app.post('/services', async (req, res) => {
    const { title, price, description, LongDescription } = req.body; // Изменено
    
    try {
      const newService = await prisma.service.create({
        data: {
          title,
          price: parseFloat(price), // Убедитесь, что цена - это число
          description, // Теперь используем поле description
          LongDescription // Все еще используем LongDescription
        }
      });
  
      res.status(201).json(newService);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка при добавлении услуги' });
    }
  });

  app.delete('/services/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Сначала удаляем все связанные записи в UserService
      await prisma.userService.deleteMany({
        where: { serviceId: Number(id) },
      });
  
      // Затем удаляем саму услугу
      const deletedService = await prisma.service.delete({
        where: {
          id: Number(id),
        },
      });
  
      res.json(deletedService); // Возвращаем информацию о удалённой услуге
    } catch (error) {
      console.error("Ошибка удаления услуги:", error);
      res.status(500).json({ error: 'Ошибка при удалении услуги' });
    }
  });

  app.put('/services/:id', async (req, res) => {
    const { id } = req.params;  // Получаем ID из параметров
    const { title, description, LongDescription, price } = req.body; // Деструктурируем тело запроса
  
    try {
      const updatedService = await prisma.service.update({
        where: {
          id: Number(id),  // Убедитесь, что ID преобразован в число
        },
        data: {
          title,
          description,
          LongDescription,
          price: parseFloat(price),
        }
      });
      res.json(updatedService);
    } catch (error) {
      console.error("Ошибка обновления услуги:", error);
      res.status(500).json({ error: "Ошибка обновления услуги" });
    }
  });
  app.post('/cart', async (req, res) => {
    const { userId, serviceId } = req.body;
  
    // Проверка, существует ли уже запись в корзине
    const existingCartItem = await prisma.userService.findUnique({
      where: {
        userId_serviceId: {
          userId,
          serviceId,
        }
      }
    });
  
    if (existingCartItem) {
      return res.status(400).json({ error: "Данная услуга уже есть в корзине." });
    }
  
    // Создание новой записи в корзине
    const cartItem = await prisma.userService.create({
      data: { userId, serviceId }
    });
  
    res.json(cartItem);
  });
  app.get('/cart', async (req, res) => {
    const { userId } = req.query;
  
    try {
      const cartItems = await prisma.userService.findMany({
        where: { userId: Number(userId) },
        include: { service: true },
      });
  
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Не удалось загрузить корзину" });
    }
  });
  app.delete('/cart/remove', async (req, res) => {
    const { userId, serviceId } = req.body;
  
    try {
      // Предположим, что у вас используется Prisma для работы с базой данных
      await prisma.userService.delete({
        where: { userId_serviceId: { userId: Number(userId), serviceId: Number(serviceId) } },
      });
  
      res.json({ message: "Услуга успешно удалена из корзины." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Не удалось удалить услугу из корзины." });
    }
  });

  app.delete('/cart/clear', async (req, res) => {
    const { userId } = req.body;
  
    try {
      await prisma.userService.deleteMany({
        where: { userId: Number(userId) },
      });
  
      res.json({ message: "Все услуги успешно удалены из корзины." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Не удалось удалить услуги из корзины." });
    }
  });
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };
// Настройте порт, по которому будет запущен сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

