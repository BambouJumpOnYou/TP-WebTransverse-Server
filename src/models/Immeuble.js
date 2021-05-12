import mongoose from "mongoose"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]
const Schema = mongoose.Schema

const immeubleSchema = new Schema(
  {
    nom: String,
    adresse: String,
    appartements: [{ type: Schema.Types.ObjectId, ref: "Appartement" }],
  },
  { collection: "Immeuble" }
)

export const Immeuble = mongoose.model("Immeuble", immeubleSchema)
