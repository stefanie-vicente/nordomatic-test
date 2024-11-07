import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildingTypeDefs } from "./schemas/building";
import { buildingResolvers } from "./resolvers/building";
import { GraphQLDateTime } from "./scalars/DateTime";

const typeDefs = [buildingTypeDefs];
const resolvers = {
  ...buildingResolvers,
  DateTime: GraphQLDateTime,
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is running at ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting the server", err);
});
