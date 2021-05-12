import { Ville } from "../models/Ville"
const dummy = require("mongoose-dummy")
const ignoredFields = ["_id", "created_at", "__v", /detail.*_info/]

export const typeDef = `
  type Ville {
    _id: ID!
    nom: String,
    codePostal: Int,
    immeubles: [Immeuble]
  }

  extend type Query {
    villeSchemaAssert: String
    villes: [Ville]
    ville(_id: ID!): Ville
  }
  extend type Mutation {
    createVille(name: String!,pseudo: String!): Boolean
    deleteVille(_id: ID!): Boolean
  }
`

export const resolvers = {
  Query: {
    // Get all villes
    villeSchemaAssert: async () => {
      return "Hello world, from Ville schema"
    },
    // Get all villes
    villes: async () => {
      let villes = []
      for (let index = 0; index < 3; index++) {
        villes.push(
          dummy(Ville, {
            ignore: ignoredFields,
            returnDate: true,
          })
        )
      }
      return villes
    },
    // Get villes by ID
    ville: async (root, { _id }, context, info) => {
      // With a real mongo db
      //return Ville.findOne({ _id });

      //Mogoose dummy
      return dummy(Ville, {
        ignore: ignoredFields,
        returnDate: true,
      })
    },
  },
  Mutation: {
    createVille: async (root, args, context, info) => {
      await Ville.create(args)
      return true
    },
    deleteVille: async (root, { _id }, context, info) => {
      return Ville.remove({ _id })
    },
  },
}
