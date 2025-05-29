// models/Products.js

import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Era "require" - debe ser "required"
    },
    description: { // Era "desciption" - faltaba 'r'
      type: String,
    },
    price: {
      type: Number,
      required: true, // Era "require" - debe ser "required"
      min: 0,
    },
    category: { // Añadido campo categoría que usa tu frontend
      type: String,
    },
    stock: {
      type: Number,
      required: true, // Era "require" - debe ser "required"
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Products", productsSchema);