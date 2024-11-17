import express from "express";
import { Employee } from "../models/employeeModel.js";
import {
  generateLowercaseUniqueId,
  validateFormData,
} from "../util/validation.js";
import { verifyToken } from "../middleware/middleware.js";

const router = express.Router();

// create new employee
router.post("/", async (req, res) => {
  // check if value is empty retur
  try {
    const formData = req.body;
    const error = validateFormData(formData);
    if (Object.keys(error).length > 0) {
      return res.status(400).json({ error });
    }
    // Check if the email already exists
    const existingEmployee = await Employee.findOne({
      f_Email: formData.f_Email,
    });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists." });
    }
    // Generate a new customerUid and check for its existence
    let customerUid;
    let uidExists = true;
    while (uidExists) {
      customerUid = generateLowercaseUniqueId();
      // Check if the generated customerUid already exists in the employee Uid
      const existingUid = await Employee.findOne({
        f_Id: customerUid,
      });

      uidExists = existingUid; // If not empty, the UID exists, so generate a new one
    }
    const newEmployee = {
      ...formData,
      f_Id: customerUid,
    };

    // create new employee and return data
    const employee = await Employee.create(newEmployee);

    return res
      .status(201)
      .json({ data: employee, message: "Successfully Created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// get all employee
router.get("/", verifyToken, async (req, res) => {
  const {
    page = 2,
    limit = 10,
    search = "",
    sortBy = "name",
    order = "asc",
  } = req.query;
  try {
    // search employee by using name , emaila and id
    const query = search
      ? {
          $or: [
            { f_Name: { $regex: search, $options: "i" } },
            { f_Email: { $regex: search, $options: "i" } },
            { f_Id: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // sorting employee table
    const sortQuery = { [sortBy]: order === "asc" ? 1 : -1 };

    // get all emplyee data
    const employee = await Employee.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const toatal = await Employee.countDocuments(query);
    // return all emplyee data with length how many emplyee we have
    return res.status(200).json({
      message: "Employee list sucessfully fetched",
      count: employee.length,
      data: employee,
      total: toatal,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// update selected employee data
router.put("/:id", async (req, res) => {
  try {
    const formData = req.body;
    //  get id from update url
    const { id } = req.params;
    const error = validateFormData(formData);
    // If errors exist, return a 400 status with error details
    if (Object.keys(error).length > 0) {
      return res.status(400).json({ error });
    }
    // Check if employee exists by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    // Check if the email already exists for another employee
    const existingEmployee = await Employee.findOne({
      f_Email: formData.f_Email,
      _id: { $ne: id }, // Exclude current employee
    });

    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // update employee by using id
    const result = await Employee.findByIdAndUpdate(id, formData);

    // if emplyee id does not exist return message to emplyee not found
    if (!result) return res.status(404).send({ message: "Employee not found" });

    return res.status(200).send({ message: "Emplyee updata successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// delete selected employee data
router.delete("/:id", async (req, res) => {
  try {
    //  get id from update url
    const { id } = req.params;
    // update employee by using id
    const result = await Employee.findByIdAndDelete(id);
    // if emplyee id does not exist return message to emplyee not found
    if (!result) return res.status(404).json({ message: "emplyee not found" });
    return res.status(201).json({ message: "emplyee deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// get particular employee info for update
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// patch active user deactive without form
router.patch("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    employee.f_IsActive = !employee.f_IsActive;
    await employee.save();
    return res
      .status(201)
      .json({ message: "Success to patch", data: employee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
