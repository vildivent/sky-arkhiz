# Ночные экскурсии в Архызе

[`https://sky-arkhiz.vercel.app/`](https://sky-arkhiz.vercel.app/)

Этот проект представляет из себя fullstack приложение-вебсайт.

При разработке были использованы такие технологии, как:

- [React](https://ru.reactjs.org/)
- [Next.JS](https://nextjs.org/)
- [Redux-toolkit](https://redux-toolkit.js.org/)
- [Tailwind](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)

# Основные функции

## Визитная карточка
Заказчику был необходим вебсайт для небольшого бизнеса, который будет представлять собой визитную карточку и иметь дополнительный функционал. Также, на основную страницу были добавлены анимации при скролле.

![mobile home page](https://user-images.githubusercontent.com/32520512/198747170-e91ad5e5-5da5-42af-92cd-e56b62f645f5.png)

## Обновляемые разделы с новостями и отзывами

- [`/news`](https://sky-arkhiz.vercel.app/news)
- [`/reviews`](https://sky-arkhiz.vercel.app/reviews)

 для администратора:
 - [`/dashboard/news`](https://sky-arkhiz.vercel.app/dashboard/news)
- [`/dashboard/reviews`](https://sky-arkhiz.vercel.app/dashboard/reviews)

Были добавлены соответствующие разделы, данные в которых подгружаются с API динамически при скролле. Также добавлена возможность добавлять/редактировать данные администратором из своей учётной записи. Новости можно искать, поиск происходит по полному совпадению фразы по полям: заголовок и описание.

![news](https://user-images.githubusercontent.com/32520512/198748271-a6ef536b-b16e-4446-ad81-49eb204e3c4c.png)

## Аутентификация

На сайте существует рездел с администрированием, который доступен по адресу [`/login`](https://sky-arkhiz.vercel.app/login).
Раздел не был добавлен в графический интерфейс, так как не подразумивает собой использование обычным пользователем.
В демонстрационной версии используются следующие данные:

логин:
```bash
admin
```
пароль:
```bash
admin
```

Для аутентификации используется JWT-токен, который сорханяется в HTTP-only cookies. Благодаря этому были созданы защищённые маршруты, которые содержат '/dashboard/...'
Также, для получения данных с различных API может потребоваться токен, например, для непроверенных администратором отзывов или для создания/удаления новостей и отзывов.

## Администрирование

После успешной аутентификации происходит перенаправление на главную страницу администрирования [`/dashboard`](https://sky-arkhiz.vercel.app/dashboard).

Здесь раcположены быстрые ссылки на необходимые администратору страницы с соответствующими параметрами

![dashboard](https://i.imgur.com/2CNEKmS.png)

Разделы с [новостями](https://sky-arkhiz.vercel.app/dasboard/news) и [заявками](https://sky-arkhiz.vercel.app/dasboard/reviews) содержат дополнинительный функционал нежели страницы, доступные пользователю

![reviews as admin](https://user-images.githubusercontent.com/32520512/198748615-cdeee9a4-67ce-4c1c-89c2-e6278124a0c2.png)

## Заявки

Была добавлена система регистрации заявок на экскурсию. Пользователь создаёт заявку и она сохраняется в базу данных. Затем администратор может их просматривать и редактировать/фильтровать и т.п.

![create request](https://user-images.githubusercontent.com/32520512/198747815-f2b6b018-4c52-411d-9d08-0f0e64a284b0.png)

Фильтрация по типу происходит на сервере для более быстрой загрузки меньшего к-ва данных, а последующие фильтрации происходят на клиенте, для более быстрой фильтрации по дате, группе и т.д.

![requests](https://i.imgur.com/5j252oF.png)

Каждое поле в каждой заявке можно независимо друг от друга редактировать.

![requests edit](https://user-images.githubusercontent.com/32520512/198743986-f02c63f5-309a-472e-af2d-4b0c706b6ce8.png)

## Реферральные ссылки 

Если адрес основной страницы дополнить параметром 'ref', например, [https://sky-arkhiz.vercel.app?ref=ref-name](https://sky-arkhiz.vercel.app?ref=ref-name), то создадутся куки длительностью 24 ч. с полем 'ref-name', и поле добавится при создании заявки на сервере. После перехода по реферральной ссылке происходит перенаправление на главную сайта, чтобы у пользователя в адресной строке не было параметров. Это реферральное имя будет видно администратору в соответствующем поле заявки.

## Адаптивность

Данный сайт полностью адаптивен под разные разрешения, основной упор при разработке был сделан под мобильные разрешения.

![mobile home page sections](https://user-images.githubusercontent.com/32520512/198747497-4539926c-0f65-4b6b-be5f-da5c351ed395.png)
![sidemenu](https://user-images.githubusercontent.com/32520512/198747978-50f0468f-d9bb-4870-adaf-5b3dacf71e96.png)
![mobile requests](https://user-images.githubusercontent.com/32520512/198747605-276211ea-cc7d-4c71-9c4c-12f044f919d6.png)




