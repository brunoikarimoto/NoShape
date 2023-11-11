import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fxho0xm.mongodb.net/NoShape`
    );

    console.log("Conexão com o mongoDB funcionando!");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

export default conn;
