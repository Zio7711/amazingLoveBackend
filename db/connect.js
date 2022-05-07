// import mongoose from 'mongoose';

// const connectDB = (url) => {
//   mongoose.connect(url);
// };

// export default connectDB;

const { Sequelize } = require("sequelize");

const connectDB = async (url) => {
  // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
  const sequelize = new Sequelize(url);
  try {
    await sequelize.authenticate();
    console.log("Postgres DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
