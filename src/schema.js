import {
  typeDef as Ville,
  resolvers as villeResolvers,
} from "./schema/ville.schema"

import {
  typeDef as Immeuble,
  resolvers as immeubleResolvers,
} from "./schema/immeuble.schema"

import {
  typeDef as Appartement,
  resolvers as appartementResolvers,
} from "./schema/appartement.schema"
import { merge } from "lodash"
import { makeExecutableSchema } from "apollo-server-express"

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`

const resolvers = {}

export const schema = makeExecutableSchema({
  typeDefs: [Query, Ville, Immeuble, Appartement],
  resolvers: merge(
    resolvers,
    villeResolvers,
    immeubleResolvers,
    appartementResolvers
  ),
})
