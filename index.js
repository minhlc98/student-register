const mongoose = require('mongoose');
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
require('dotenv').config();

const { studentTypeDefs } = require("./modules/students/student.type-defs.js");
const { studentResolvers } = require("./modules/students/student.resolver");
const { subjectTypeDefs } = require("./modules/subjects/subject.type-defs");
const { subjectResolvers } = require("./modules/subjects/subject.resolver");

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    minPoolSize: 10,
  })
  .then(() => {
    console.log(`DB Connected.`);
  })
  .catch(err => {
    console.log(err.message);
  });

const typeDefs = [studentTypeDefs, subjectTypeDefs];
const resolvers = [studentResolvers, subjectResolvers];

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});