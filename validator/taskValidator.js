import { body, param, validationResult } from "express-validator";

export const validateTask = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 400 })
    .withMessage("Description can’t exceed 400 characters"),

  body("status")
    .optional() // field is optional
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be one of: Pending, In Progress, Completed"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMsg = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMsg.join() });
    }
    next();
  },
];

export const validateId = [
  param("id").isMongoId().withMessage("Invalid task Id"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMsg = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMsg.join() });
    }
    next();
  },
];
