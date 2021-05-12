import { ApolloServer, gql } from "apollo-server"

const typeDefs = gql`
  type Ville {
    nom: String
    codePostal: Int
    immeubles: [Immeuble]
  }

  type Immeuble {
    nom: String
    adresse: String
    appartements: [Appartement]
  }

  type Appartement {
    numero: Int
    nbPieces: Int
  }

  type Query {
    villes: [Ville]
    immeubles: [Immeuble]
    appartements: [Appartement]
  }
`

const appartement = [
  {
    numero: 421,
    nbPieces: 15,
  },
]

const immeuble = [
  {
    nom: "Fleur de cactus",
    adresse: "15 Rue de Archimboldo",
    appartements: appartement,
  },
]

const ville = [
  {
    nom: "Clermont-Ferrand",
    codePostal: 63200,
    immeubles: immeuble,
  },
]

const resolvers = {
  Query: {
    villes: () => ville,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
