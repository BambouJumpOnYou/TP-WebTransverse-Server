import { Ville } from "../models/Ville"
import { Immeuble } from "../models/Immeuble"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]

export const typeDef = `
  type Ville {
    _id: ID!
    nom: String
    codePostal: Int
    immeubles: [Immeuble]
  }

  input VilleInput {
    nom: String
    codePostal: Int
  }

  extend type Query {
    villeSchemaAssert: String
    villes: [Ville]
    ville(_id: ID!): Ville
  }
  extend type Mutation {
    createVille(nom: String!,codePostal: Int!): Boolean
    deleteVille(_id: ID!): Boolean
    updateVille(_id: ID!, input: VilleInput) : Ville
    ajouterImmeubleToVille(_id: ID!, input: ImmeubleInput) : Boolean
    ajouterImmeubleIDToVille(_id: ID!, idImm: ID!) : Ville
  }
`

export const resolvers = {
  Query: {
    // Get a little string for schema
    villeSchemaAssert: async () => {
      return "C'est le schéma de ville"
    },
    // Get all villes
    villes: async () => {
      let villes = []
      villes = await Ville.find().populate({
        path: "immeubles",
        populate: { path: "appartements" },
      })
      return villes
    },
    // Get villes by ID
    ville: async (root, { _id }, context, info) => {
      // With a real mongo db
      return await Ville.findOne({ _id }).populate({
        path: "immeubles",
        populate: { path: "appartements" },
      })
    },
  },
  Mutation: {
    createVille: async (root, { nom, codePostal }, context, info) => {
      let elem = {
        nom: nom,
        codePostal: codePostal,
      }
      await Ville.create(elem)
      return true
    },

    deleteVille: async (root, { _id }, context, info) => {
      return Ville.remove({ _id })
    },

    ajouterImmeubleToVille: async (root, { _id, input }) => {
      let imm = await Immeuble.create(input)
      let ville = await Ville.findByIdAndUpdate(_id, {
        $push: {
          immeubles: imm,
        },
      })
      ville.save()
      return true
    },

    ajouterImmeubleIDToVille: async (root, { _id, idImm }) => {
      let imm = await Immeuble.findOne({ _id: idImm })
      let ville = await Ville.findByIdAndUpdate(
        _id,
        {
          $push: {
            immeubles: {
              _id: imm._id,
              nom: imm.nom,
              adresse: imm.adresse,
              appartements: imm.appartements,
            },
          },
        },
        { safe: true, upsert: true, new: true }
      )
      ville.save()
      return ville
    },
  },
}
