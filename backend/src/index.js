import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/Contact.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.sync({ alter: false });
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();
