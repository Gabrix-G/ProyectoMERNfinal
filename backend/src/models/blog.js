/*

Coleccion: Blog

Campos:
  Title
  Content
  Image


*/
import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: toString
    },
    image: {
        type: String
    }
},{
    timestamps: true,
    strict: false
}
)

export default model ("blog", blogSchema)