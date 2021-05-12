import { Immeuble } from "../models/Immeuble"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]

export const typeDef = `
  type Immeuble {
    _id: ID!
    nom: String,
    adresse: String,
    appartements: [Appartement],
  }

  extend type Query {
    immeubleSchemaAssert: String
    immeubles: [Immeuble]
    immeuble(_id: ID!): Immeuble
  }
  extend type Mutation {
    createImmeuble(name: String!,pseudo: String!): Boolean
    deleteImmeuble(_id: ID!): Boolean
  }
`

export const resolvers = {
  Query: {
    // Get all immeubles
    immeubleSchemaAssert: async () => {
      return "Hello world, from Immeuble schema"
    },
    // Get all immeubles
    immeubles: async () => {
      let immeubles = []
      for (let index = 0; index < 3; index++) {
        immeubles.push(
          dummy(Immeuble, {
            ignore: ignoredFields,
            returnDate: true,
          })
        )
      }
      return immeubles
    },
    // Get immeubles by ID
    immeuble: async (root, { _id }, context, info) => {
      // With a real mongo db
      //return Immeuble.findOne({ _id });

      //Mogoose dummy
      return dummy(Immeuble, {
        ignore: ignoredFields,
        returnDate: true,
      })
    },
  },
  Mutation: {
    createImmeuble: async (root, args, context, info) => {
      await Immeuble.create(args)
      return true
    },
    deleteImmeuble: async (root, { _id }, context, info) => {
      return Immeuble.remove({ _id })
    },
  },
}
