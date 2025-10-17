const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const Alumni = require("../models/alumniModel");
const StudentMaster = require("../models/studentMasterModel");
const AlumniMaster = require("../models/alumniMasterModel");
const { Op } = require("sequelize");
require("dotenv").config();

// Helper function: Normalize name
const normalizeName = (name) => name.trim().toLowerCase();

// ==========================
// REGISTER
// ==========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, branch, graduation_year, academic_year } = req.body;

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ✅ Hash password
    const password_hash = await bcrypt.hash(password, 10);

    let status = "pending"; // default
    let message = "Registration pending verification by admin.";

    // ✅ Normalize name for consistent matching
    const normalizedName = name.trim().toLowerCase();

    if (role === "alumni") {
      const alumniExists = await AlumniMaster.findOne({
        where: {
          normalized_name: normalizedName,
          branch: { [Op.iLike]: branch.trim() }, 
          graduation_year: Number(graduation_year),
        },
      });

      if (alumniExists) {
        status = "active";
        message = "Alumni found in master record. Registration successful!";
      } else {
        console.log("Alumni not found in master list:", {
          normalizedName,
          branch,
          graduation_year,
        });
      }

    } else if (role === "student") {
      const studentExists = await StudentMaster.findOne({
        where: {
          normalized_name: normalizedName,
          branch: { [Op.iLike]: branch.trim() }, 
          academic_year: Number(academic_year),
        },
      });

      if (studentExists) {
        status = "active";
        message = "Student found in master record. Registration successful!";
      } else {
        console.log("Student not found in master list:", {
          normalizedName,
          branch,
          academic_year,
        });
      }
    }

    // ✅ Create user
    const newUser = await User.create({
      name,
      email,
      password_hash,
      role,
      status,
    });

    // ✅ Return appropriate message
    res.status(201).json({
      message,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ==========================
// LOGIN
// ==========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("\n🔐 Login attempt:", email);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("📋 Found user:", { email: user.email, status: user.status });

    if (user.status === "pending") {
      console.log("⚠️ Account pending verification");
      return res.status(403).json({ message: "Your account is pending verification" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matched, creating token...");
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, userId: user.id, role: user.role, name: user.name });
  } catch (err) {
    console.error("❌ Error in login:", err);
    res.status(500).json({ message: "Server error" });
  }
};
