# Для соединения с БД

Надо создать в папке packages/server файл .env с переменной DATABASE_URL

    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# Для старта проекта в дев режиме
1. Перейти в корень проекта

2. Установить зависимости 

        yarn
        
3. Запустить проекты 

        yarn start
