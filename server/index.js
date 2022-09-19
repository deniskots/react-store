require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/ErrorMiddleware')

const PORT = process.env.PORT || 5000;

const app = express();
//для отправки запросов с браузера
app.use(cors());
app.use(express.json());
//для полученпия файлов из статика
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


//последный должен быть обработка ошиюок
app.use(errorMiddleware)


const start = async () => {
    try {
        //функци для подключения к базе данных и sync(для сверки БД и схемы данных)
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()

