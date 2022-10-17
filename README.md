# Для соединения с БД

Базу данных поднял в [railway](https://railway.app)

Надо создать в папке packages/server файл .env с переменной DATABASE_URL

    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# Для старта проекта в дев режиме
1. Перейти в корень проекта

2. Установить зависимости 

        yarn

3. Накатить схему на базу (перед этим прописать DATABASE_URL)
        
        cd packages/server/
        npx prisma db push
        
4. Перейти в корень проекта

5. Запустить проекты 

        yarn start
