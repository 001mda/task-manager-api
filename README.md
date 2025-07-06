# task-manager-api
# Task Manager API

Это Backend API для управления задачами и пользователями с авторизацией и административной панелью. Реализовано на NestJS + PostgreSQL + Prisma.

---

## Стек технологий

- **NestJS** (Backend Framework)
- **PostgreSQL** (База данных)
- **Prisma** (ORM)
- **JWT** (Авторизация Access/Refresh Token)
- **Swagger** (Документация API)
- **Postman** (Тестирование)
- **Railway** (Деплой)



## Установка

```bash
git clone https://github.com/username/task-manager-api.git
cd task-manager-api
npm install
```

---

## Настройка `.env`

Создай `.env` файл в корне проекта и заполни переменные:

Пример (`.env.example` уже есть в репозитории):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"

JWT_SECRET="your_access_jwt_secret"
JWT_EXPIRES_IN="15m"

JWT_REFRESH_SECRET="your_refresh_jwt_secret"
JWT_REFRESH_EXPIRES_IN="7d"
```

---

## Миграции Prisma

Сначала примените миграции и сгенерируйте Prisma Client:

```bash
npx prisma migrate dev --name init
```

(если нужно сбросить и заново: `npx prisma migrate reset`)

---

##  Запуск сервера

```bash
npm run start:dev
```

Сервер будет доступен по адресу:

```bash
http://localhost:3000
```

---

## Swagger документация

После запуска открой:

```
http://localhost:3000/api
```

Там находится Swagger-документация со всеми доступными маршрутами API.

---

## Основные маршруты

- `POST /auth/register` – регистрация
- `POST /auth/login` – авторизация
- `GET /auth/me` – получить профиль
- `POST /auth/refresh` – обновление токена
- `POST /auth/forgot-password` – запрос сброса пароля
- `POST /auth/reset-password` – сброс пароля

**Задачи (только для авторизованных):**
- `POST /tasks`
- `GET /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

**Админ:**
- `GET /admin/users`
- `PUT /admin/users/:id`
- `DELETE /admin/users/:id`

---

## Деплой

Проект можно деплоить на Railway, Render и другие платформы. Для Railway:

- Установи PostgreSQL через Railway
- Добавь `DATABASE_URL` в настройках переменных
- Задеплой репозиторий через GitHub

---
