const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedPortfolio = async () => {
  const projects = [
    {
      title: "Разработка сайта для ресторана",
      imageUrl: "https://ribs-nn.ru/local/templates/ribs_promolink/style/logo.svg",
      resourceUrl: "https://ribs-nn.ru",
    },
    {
      title: "Создание логотипа для стартапа",
      imageUrl: "https://static.tildacdn.com/tild3062-6665-4263-b131-626662306566/Logo_simble.svg",
      resourceUrl: "https://simble.in",
    },
    {
      title: "Реклама фармацевтического бренда Sanofi",
      imageUrl: "https://www.unisender.com/wp-content/uploads/2023/08/9-5.png",
      resourceUrl: "https://www.edelman.com/work/scent-life-sanofi",
    },
    {
      title: "Оформление научной электронной библиотеки eLIBRARY.ru",
      imageUrl: "https://elibrary.ru/images/esanta.svg",
      resourceUrl: "https://elibrary.ru/defaultx.asp?",
    },
  ];

  for (const project of projects) {
    await prisma.portfolio.create({
      data: project,
    });
  }

  console.log("Проекты успешно добавлены в базу данных");
};

seedPortfolio()
  .catch((error) => {
    console.error("Ошибка при добавлении проектов:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });