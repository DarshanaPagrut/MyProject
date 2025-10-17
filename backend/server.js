const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));

// Sync models
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const AlumniMaster = require("./src/models/alumniMasterModel");
// const StudentMaster = require("./src/models/studentMasterModel");

// (async () => {
//   try {
//     await sequelize.sync({ alter: true }); // sync models

//     // Dummy Alumni Data
//     await AlumniMaster.bulkCreate([
//       { name: "Darshana Pagrut", graduation_year: 2023, branch: "IT", normalized_name: "darshana pagrut" },
//       { name: "Aarav Sharma", graduation_year: 2022, branch: "CSE", normalized_name: "aarav sharma" },
//     ]);

//     // Dummy Student Data
//     await StudentMaster.bulkCreate([
//       { name: "Sneha Patel", academic_year: 2025, branch: "IT", normalized_name: "sneha patel" },
//       { name: "Rohan Mehta", academic_year: 2026, branch: "ENTC", normalized_name: "rohan mehta" },
//     ]);

//     console.log("✅ Dummy data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting dummy data:", error);
//   }
// })();


