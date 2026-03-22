const expressValidator = require("express-validator")
const { body, param, validationResult } = expressValidator;

const createValidation = [
    body("title")
        .notEmpty()
        .withMessage((val, { req }) => req.t("TITLE_REQUIRED"))
        .isString()
        .withMessage((val, { req }) => req.t("TITLE_TYPE"))
        .isLength({ min: 5, max: 100 })
        .withMessage((val, { req }) => req.t("TITLE_LENGTH")),

    body("isbn")
        .notEmpty()
        .withMessage((val, { req }) => req.t("ISBN_REQUIRED"))
        .isString()
        .withMessage((val, { req }) => req.t("ISBN_TYPE")),

    body("author")
        .notEmpty()
        .withMessage((val, { req }) => req.t("AUTHOR_REQUIRED"))
        .isString().isLength({ min: 3, max: 100 })
        .withMessage((val, { req }) => req.t("AUTHOR_LENGTH")),

    body("countInStock")
        .notEmpty()
        .withMessage((val, { req }) => req.t("STOCK_REQUIRED"))
        .isInt({ min: 1, max: 1000 })
        .withMessage((val, { req }) => req.t("STOCK_RANGE")),

    body("image")
        .isURL()
        .withMessage((val, { req }) => req.t("IMAGE_URL"))
];

const updateValidation = [
    body("title")
        .optional()
        .isLength({ min: 5, max: 100 })
        .withMessage((val, { req }) => req.t("TITLE_LENGTH")),

    body("isbn")
        .optional(),

    body("author")
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage((val, { req }) => req.t("AUTHOR_LENGTH")),

    body("countInStock")
        .optional()
        .isInt({ min: 1, max: 1000 })
        .withMessage((val, { req }) => req.t("STOCK_RANGE")),

    body("image")
        .isURL()
        .withMessage((val, { req }) => req.t("IMAGE_URL"))
];

const idValidation = [
    param("id").isMongoId()
        .withMessage((val, { req }) => req.t("INVALID_ID")),
]

const handleValidationErrors = (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
        const errorsArray = errors.map((err) => ({
            [err.path]: err.msg
        }));
        return res.status(400).json({ message: errorsArray })
    }
    next();
}

module.exports = {
    createValidation,
    updateValidation,
    idValidation,
    handleValidationErrors
}