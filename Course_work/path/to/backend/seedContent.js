const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const contentItems = [
    {
      imageUrl: "https://kdm1.ru/local/img/new/index/new_illustrate2/33.png",
      title: "Бережем мозг и время заказчиков",
      description: "Только мы сами напишем тексты сайта, сделаем буклеты, подготовим выставку и любой другой проект без лишних ТЗ и прочей ерунды."
    },
    {
      imageUrl: "https://kdm1.ru/local/img/new/index/new_illustrate2/66.png",
      title: "Соблюдение сроков",
      description: "В 99% случаев мы укладываемся в оговоренный срок. Часто завершаем проект раньше. Почти никогда — позже."
    },
    {
      imageUrl: "https://kdm1.ru/local/img/new/index/new_illustrate2/22.png",
      title: "Качество и профессионализм",
      description: "Над задачами будут работать настоящие профессионалы, нанять которых в штат обычной компании очень-очень-очень дорого."
    },
    {
      imageUrl: "https://kdm1.ru/local/img/new/index/new_illustrate2/55.png",
      title: "Маркетинг 24/7",
      description: "Мы не уходим в отпуск, декрет, никогда не болеем, можем работать по ночам и даже иногда в выходные."
    }
  ];

  // Вставка данных в таблицу ContentItem
  for (const item of contentItems) {
    await prisma.contentItem.create({
      data: item
    });
  }

  console.log("Контент-элементы успешно добавлены!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });