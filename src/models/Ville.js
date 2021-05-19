import mongoose from "mongoose"
const Schema = mongoose.Schema

const villeSchema = new Schema(
  {
    nom: String,
    codePostal: Number,
    immeubles: [{ type: Schema.Types.ObjectId, ref: "Immeuble" }],
  },
  { collection: "Ville" }
)

export const Ville = mongoose.model("Ville", villeSchema)
