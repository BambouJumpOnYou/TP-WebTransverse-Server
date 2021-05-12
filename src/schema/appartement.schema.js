import { Appartement } from "../models/Appartement"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]

export const typeDef = `
  type Appartement {
    _id: ID!
    numero: Int,
    nbPieces: Int,
  }

  extend type Query {
    appartementSchemaAssert: String
    appartements: [Appartement]
    appartement(_id: ID!): Appartement
  }
  extend type Mutation {
    createAppartement(name: String!,pseudo: String!): Boolean
    deleteAppartement(_id: ID!): Boolean
  }
`

export const resolvers = {
  Query: {
    // Get all appartements
    appartementSchemaAssert: async () => {
      return "Hello world, from Appartement schema"
    },
    // Get all appartements
    appartements: async () => {
      let appartements = []
      for (let index = 0; index < 3; index++) {
        appartements.push(
          dummy(Appartement, {
            ignore: ignoredFields,
            returnDate: true,
          })
        )
      }
      return appartements
    },
    // Get appartements by ID
    appartement: async (root, { _id }, context, info) => {
      // With a real mongo db
      //return Appartement.findOne({ _id });

      //Mogoose dummy
      return dummy(Appartement, {
        ignore: ignoredFields,
        returnDate: true,
      })
    },
  },
  Mutation: {
    createAppartement: async (root, args, context, info) => {
      await Appartement.create(args)
      return true
    },
    deleteAppartement: async (root, { _id }, context, info) => {
      return Appartement.remove({ _id })
    },
  },
}
