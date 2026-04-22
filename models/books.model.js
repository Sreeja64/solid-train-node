const mongoose = require("mongoose")

//create a schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true,
        required: [true, "Book title is required"],
        minLength: [5, "Book title must be atleast 5 characters long"],
        maxLength: [100, "Book title cannot exceed 100 characters"],
    },
    isbn: {
        type: String,
        // required: true,
        required: [true, "ISBN is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        minLength: [3, "Author name must be atleast 5 characters long"],
        maxLength: [100, "Author name cannot exceed 100 characters"],
    },
    countInStock: {
        type: Number,
        required: [true, "Count In Stock is required"],
        min: [1, "Count In Stock must not be less than 1"],
        max: [1000, "Count In Stock must not be greater than 1"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: "",
        validate: {
            validator: (v) => {
                if (!v) return true;
                return /^https:\/\/.+/.test(v);
            },
            message: "Please enter a valid image url"
        }
    }
})

bookSchema.virtual("id").get(function () {
    return this._id
})

bookSchema.set("toJSON", {
    virtuals: true
})

const BookModel = mongoose.model("Book", bookSchema)

module.exports = BookModel
