const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

class DataBase {

    static #HOST = process.env.DATABASE_HOST;
    static #NAME = process.env.DATABASE_NAME;
    static #SETTINGS = process.env.DATABASE_SETTINGS;

    static async connect() {
        await mongoose.connect(`${this.#HOST}${this.#NAME}${this.#SETTINGS}`)
            .then(() => console.log('DataBase: ', 'connected to DataBase.'))
            .catch((err) => console.log("DataBase, Error: ", err));
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

    static async getConnection() {
        return await mongoose.connection;
    }
}

module.exports = DataBase;