# Сайт рекламного агентства
Курсовая работа по предмету: "Web-технологии"
## Введение

Курсовая работа представляет собой разработку сайта для рекламного агентства, включающий создание динамического веб-приложения с использованием локального сервера **Open Server**, базы данных, кроссбраузерных шаблонов и динамически изменяемого контента. 

Сайт будет предоставлять информацию о рекламных услугах, а также обеспечивать удобный способ загрузки и выгрузки контента через интерфейс с базой данных. Проект разработан с учетом современных стандартов веб-разработки и имеет привлекательный, адаптивный дизайн.

## Анализ технического задания

### Основные требования:
1. **Локальный сервер (Open Server)** для тестирования и разработки сайта.
2. **Создание базы данных** для хранения информации о текстах, изображениях и разделах.
3. **Динамическая загрузка и выгрузка данных** с использованием PHP и AJAX.
4. **Кроссбраузерность** сайта (поддержка популярных браузеров: Chrome, Firefox, Safari, Edge).
5. **Динамическое изменение контента** на странице через AJAX и JavaScript.
6. **Комментарирование кода** для улучшения понимания и поддержки проекта.

## Описание используемых языков программирования

1. **HTML** — основной язык разметки для создания структуры веб-страниц.
2. **CSS** — используется для стилизации элементов, создания адаптивного дизайна с помощью Flexbox.
3. **JavaScript** — добавляет интерактивность, динамическое обновление данных через AJAX.
4. **PHP** — серверный язык для обработки запросов и взаимодействия с базой данных.
5. **SQL** — используется для работы с реляционной базой данных PostgreSQL, запросов на выборку, добавление и удаление данных.

## Выбор и обоснование архитектуры системы

Проект реализован с использованием **многослойной архитектуры**, где каждый слой выполняет свою функцию:

- **Frontend** (HTML, CSS, JavaScript) — отвечает за отображение контента и взаимодействие с пользователем.
- **Backend** (PHP) — обрабатывает запросы и генерирует динамический контент.
- **Database** (PostgreSQL) — хранит данные, такие как тексты, изображения и разделы.

### Кроссбраузерность и адаптивность
Сайт будет адаптирован под различные устройства и браузеры, используя **Flexbox** и **Media Queries** для создания адаптивного дизайна.

## Выбор и обоснование алгоритмов

Для реализации функциональности используются следующие алгоритмы:

1. **Алгоритмы работы с базой данных:**
   - Использование SQL-запросов для получения, добавления и удаления данных.
   - Оптимизация запросов для минимизации времени отклика.

2. **Алгоритмы взаимодействия с пользователем:**
   - **AJAX-запросы** для динамической загрузки данных без перезагрузки страницы.
   - **Обработчики событий** JavaScript для обработки пользовательских действий.

3. **Алгоритмы валидации данных:**
   - Валидация данных на стороне клиента с помощью JavaScript.
   - Валидация данных на сервере с использованием PHP для обеспечения безопасности и защиты от SQL-инъекций.

## Описание программы

Проект состоит из нескольких ключевых компонентов:

1. **Frontend**:
   - **HTML** — структура страниц.
   - **CSS** — оформление и адаптивная верстка.
   - **JavaScript** — обработка событий и динамическое изменение контента.

2. **Backend (PHP)**:
   - Обработка запросов пользователей.
   - Взаимодействие с базой данных для получения и обновления данных.

3. **Database (PostgreSQL)**:
   - Хранение данных о разделах, текстах и изображениях.
   - Обработка запросов с использованием SQL.

### Взаимодействие между компонентами

- **Frontend** отправляет запросы на **Backend**, который обращается к **Database** для получения необходимых данных. После этого данные передаются обратно на **Frontend** для отображения.

## Структура базы данных

Проект использует следующую структуру базы данных:

1. **Таблица `sections`**:
   - Хранит данные о разделах сайта: `id`, `title`, `slug`, `content`, `created_at`.

2. **Таблица `images`**:
   - Хранит информацию о изображениях, связанных с разделами: `id`, `image_path`, `section_id`, `created_at`.

3. **Таблица `texts`**:
   - Хранит тексты, связанные с разделами: `id`, `text_content`, `section_id`, `created_at`.

## Заключение

Проект по созданию сайта рекламного агентства учитывает все основные аспекты современной веб-разработки, включая взаимодействие с базой данных, динамическое обновление контента и обеспечение кроссбраузерности. Архитектура системы проста и масштабируема, что позволяет легко адаптировать сайт под новые требования в будущем.

---
