import mongoose from "mongoose"
const Schema = mongoose.Schema

const appartementSchema = new Schema(
  {
    numero: Number,
    nbPieces: Number,
  },
  { collection: "Appartement" }
)

export const Appartement = mongoose.model("Appartement", appartementSchema)
