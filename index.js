

//ES Module
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

//CommonJS Module
const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const i18Next = require("i18next")
const localizationBackend = require("i18next-fs-backend")
const localizationMiddleware = require("i18next-http-middleware")
const bookRouter = require("./routes/books.routes")

dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
const connectDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("Connected to DB")
    } catch (e) {
        console.log("DB Connection Failed: ", e)
    }
}

connectDB();

i18Next
.use(localizationBackend) //to load locales files
.use(localizationMiddleware.LanguageDetector) //to detect language from the request
.init({
    fallback: "en", 
    backend: {
        loadPath: "locales/{{language}}.json"
    }
})

/**
 * Express application instance
 * @type {express.Application}
 * @description The main Express application object contains properties and methods used to configure routes, middleware, and server behavior 
 * for handling HTTP requests and responses
 */
const app = express();
const port = 3000;

//middleware to parse json requests
app.use(express.json());
app.use(localizationMiddleware.handle(i18Next));
app.use("/books", bookRouter)

app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`)
})


// app.get("/", (req, res) => {
//     res.send("Hello");
// })

// app.get("/about", (req, res) => {
//     res.send("About");
// })

// const result = require('./helpers/logger/result')

// console.log(result(60, 50, 20), "Result")

