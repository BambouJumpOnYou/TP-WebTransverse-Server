import mongoose from "mongoose"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]
const Schema = mongoose.Schema

const appartementSchema = new Schema(
  {
    numero: Number,
    nbPieces: Number,
  },
  { collection: "Appartement" }
)

export const Appartement = mongoose.model("Appartement", appartementSchema)
