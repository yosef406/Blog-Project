const { default: mongoose } = require('mongoose');

class DataBase {

    static async connect() {
        const mongoose = require('mongoose');

        await mongoose.connect('mongodb://127.0.0.1:27017/project1?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0')
            .then(() => console.log('DataBase: ', 'connected to DataBase.'))
            .catch((err) => console.log("DataBase, Error: ", err));
    }

    static async disconnect() {
        await mongoose.disconnect();
    }
}

module.exports = DataBase;