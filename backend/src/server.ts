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
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`Server is running at ${url}`);
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

(async () => {
  await startServer();
})();
