// createAdmin.js
const bcrypt = require("bcrypt");
const sequelize = require("../config/db"); // your existing sequelize instance
const User = require("../models/userModel"); // import your existing User model

(async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // Sync table (creates table if it doesn't exist)
    await sequelize.sync();

    // Hash admin password
    const hashedPassword = await bcrypt.hash("admin@123", 10);

    // Create admin if not exists
    const [admin, created] = await User.findOrCreate({
      where: { email: "admin@college.in" },
      defaults: {
        name: "Platform Admin",
        password_hash: hashedPassword,
        role: "admin",
        status: "active",
      },
    });

    console.log(created ? "✅ Admin created!" : "ℹ️ Admin already exists.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
})();
