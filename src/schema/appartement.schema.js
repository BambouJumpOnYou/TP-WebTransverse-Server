import { Appartement } from "../models/Appartement"
import { Immeuble } from "../models/Immeuble"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]

export const typeDef = `
  type Appartement {
    _id: ID!
    numero: Int
    nbPieces: Int
  }

  input AppartementInput {
    numero: Int
    nbPieces: Int
  }

  extend type Query {
    appartementSchemaAssert: String
    appartements: [Appartement]
    appartement(_id: ID!): Appartement
  }
  extend type Mutation {
    createAppartement(numero: Int!, nbPieces: Int! ): Boolean
    deleteAppartement(_id: ID!): Boolean
    updateAppartement(_id: ID!, input: AppartementInput) : Appartement

  }
`

export const resolvers = {
  Query: {
    // Get a little string for schema
    appartementSchemaAssert: async () => {
      return "C'est le schéma de appartement"
    },
    // Get all appartements
    appartements: async () => {
      let appartements = []
      appartements = await Appartement.find()
      console.log(appartements)
      return appartements
    },
    // Get appartements by ID
    appartement: async (root, { _id }, context, info) => {
      return Appartement.findOne({ _id })
    },
  },
  Mutation: {
    createAppartement: async (root, { numero, nbPieces }, context, info) => {
      let elem = {
        numero: numero,
        nbPieces: nbPieces,
      }
      await Appartement.create(elem)
      return true
    },
    deleteAppartement: async (root, { _id }, context, info) => {
      await Appartement.remove({ _id })
      return true
    },
    updateAppartement: async (root, { _id, input }) => {
      return Appartement.findByIdAndUpdate(_id, input, { new: true })
    },
  },
}
