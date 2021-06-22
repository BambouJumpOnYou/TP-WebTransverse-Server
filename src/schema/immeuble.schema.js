import { Immeuble } from "../models/Immeuble"
import { Appartement } from "../models/Appartement"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]

export const typeDef = `
  type Immeuble {
    _id: ID!
    nom: String
    adresse: String
    appartements: [Appartement]
  }

  input ImmeubleInput {
    nom: String
    adresse: String
  }

  extend type Query {
    immeubleSchemaAssert: String
    immeubles: [Immeuble]
    immeuble(_id: ID!): Immeuble
  }
  extend type Mutation {
    createImmeuble(nom: String!,adresse: String!): Boolean
    deleteImmeuble(_id: ID!): Boolean
    updateImmeuble(_id: ID!, input: ImmeubleInput) : Immeuble
    ajouterAppartementToImmeuble(_id: ID!, input: AppartementInput) : Boolean
    ajouterAppartementIDToImmeuble(_id: ID!, idApp: ID!) : Immeuble

  }
`

export const resolvers = {
  Query: {
    // Get a little string for schema
    immeubleSchemaAssert: async () => {
      return "C'est le schéma de immeuble"
    },
    // Get all immeubles
    immeubles: async () => {
      let immeubles = []
      immeubles = Immeuble.find().populate("appartements")
      console.log(immeubles)
      return immeubles
    },
    // Get immeubles by ID
    immeuble: async (root, { _id }, context, info) => {
      // With a real mongo db
      return Immeuble.findOne({ _id }).populate("appartements")

      //Mogoose dummy
    },
  },
  Mutation: {
    createImmeuble: async (root, { nom, adresse }, context, info) => {
      let elem = {
        nom: nom,
        adresse: adresse,
      }
      await Immeuble.create(elem)
      return true
    },
    deleteImmeuble: async (root, { _id }, context, info) => {
      await Immeuble.remove({ _id })
      return true
    },
    ajouterAppartementToImmeuble: async (root, { _id, input }) => {
      let appart = await Appartement.create(input)
      let imm = await Immeuble.findByIdAndUpdate(_id, {
        $push: {
          appartements: appart,
        },
      })
      imm.save()
      return true
    },

    ajouterAppartementIDToImmeuble: async (root, { _id, idApp }) => {
      let appart = await Appartement.findOne({ _id: idApp })
      let imm = await Immeuble.findByIdAndUpdate(
        _id,
        {
          $push: {
            appartements: {
              _id: appart._id,
              numero: appart.numero,
              nbPieces: appart.nbPieces,
            },
          },
        },
        { safe: true, upsert: true, new: true }
      )
      imm.save()
      return imm
    },
  },
}
