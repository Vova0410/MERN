
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

// регистрируем роуты для обработки запросов с фронт-энда
app.use('/api/auth', require('./routes/auth.routes'));


// создаем постоянную, которая будет брать номер порта из config/default.json
const PORT = config.get('port') || 5000; // по умолчанию 5000

// пишем оболочку для ассинхронной функции подключения к базе данных
async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            // эти параметры нужны для корректной работы конекта
            useNewUrlParser: true, // mongoose подсказал в ворнингах
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`)});
    } catch (e) {
      console.log('server error', e.message);
      process.exit(1)
    }

}

start();// вызываем функцию start


