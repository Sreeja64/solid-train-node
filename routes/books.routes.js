const express = require("express")
const BookModel = require("../models/books.model")
const { createValidation, updateValidation, idValidation, handleValidationErrors } = require("../validators/books.validator")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const bookList = await BookModel.find();
        res.status(200).json({ data: bookList, message: req.t("BOOKS_FETCHED") })
    } catch (err) {
        res.status(500).json({ data: null, message: err.message })
    }
})

router.get("/:id",
    idValidation,
    handleValidationErrors,
    async (req, res) => {
        try {
            const { id } = req.params;
            const book = await BookModel.findById(id);
            if (book)
                res.status(200).json({ data: book, message: req.t("BOOK_FETCHED") })
            else
                res.status(404).json({ data: null, message: req.t("BOOK_NOT_FOUND") })
        } catch (err) {
            res.status(500).json({ data: null, message: err.message })
        }
    })

router.post("/",
    createValidation,
    handleValidationErrors,
    async (req, res) => {
        try {
            const newBook = await BookModel.create(req.body);
            res.status(201).json({
                data: newBook,
                message: req.t("BOOK_CREATED")
            })
        } catch (err) {
            res.status(500).json({ data: null, message: err.message })
        }
    })

router.put("/:id",
    idValidation,
    updateValidation,
    handleValidationErrors,
    async (req, res) => {
        try {
            const { id } = req.params;
            const existingBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
            if (existingBook) {
                res.status(200).json({
                    data: existingBook,
                    message: req.t("BOOK_UPDATED")
                })
            } else {
                res.status(404).json({ data: null, message: req.t("BOOK_NOT_FOUND") })
            }
        } catch (err) {
            res.status(500).json({ data: null, message: err.message })
        }
    })

router.delete("/:id",
    idValidation,
    handleValidationErrors,
    async (req, res) => {
        try {
            const { id } = req.params;
            const book = await BookModel.findByIdAndDelete(id);
            if (book)
                res.status(200).json({ data: null, message: req.t("BOOK_DELETED") })
            else
                res.status(404).json({ data: null, message: req.t("BOOK_NOT_FOUND") })
        } catch (err) {
            res.status(500).json({ data: null, message: err.message })
        }
    })

module.exports = router;