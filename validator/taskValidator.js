import { body, param, validationResult } from "express-validator";

// Middleware to validate task input data
export const validateTask = [
  // Validate 'name' field
  body("name")
    .notEmpty() // Must not be empty
    .withMessage("Name is required")
    .isLength({ min: 3 }) // Minimum 3 characters
    .withMessage("Name must be at least 3 characters"),

  // Validate 'description' field
  body("description")
    .notEmpty() // Must not be empty
    .withMessage("Description is required")
    .isLength({ max: 400 }) // Maximum 400 characters
    .withMessage("Description can’t exceed 400 characters"),

  // Validate 'status' field (optional)
  body("status")
    .optional() // Field is optional
    .isIn(["Pending", "In Progress", "Completed"]) // Must be one of these values
    .withMessage("Status must be one of: Pending, In Progress, Completed"),

  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Combine all error messages into one string
      let errorMsg = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMsg.join() });
    }
    next(); // Proceed if no errors
  },
];


// Middleware to validate MongoDB ObjectId in request parameters
export const validateId = [
  // Check that 'id' is a valid MongoDB ObjectId
  param("id")
    .isMongoId()
    .withMessage("Invalid task Id"),

  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Combine all error messages into one string
      let errorMsg = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMsg.join() });
    }
    next(); // Proceed if no errors
  },
];

