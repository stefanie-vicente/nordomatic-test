// src/server.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildingTypeDefs } from './schemas/building'; 
import { buildingResolvers } from './resolvers/building'; 

const typeDefs = [buildingTypeDefs];  
const resolvers = [buildingResolvers];  

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the server on port 4000
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is running at ${url}`);
};

startServer().catch((err) => {
  console.error('Error starting the server', err);
});
