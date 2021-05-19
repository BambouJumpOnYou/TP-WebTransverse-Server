import mongoose from "mongoose"
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
