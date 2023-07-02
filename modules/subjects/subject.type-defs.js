const gql = require("graphql-tag");

const typeDefs = gql`
  scalar DateTime

  type Query {
    subjects(page: Int, limit: Int): [Subject]
    subject(id: ID!): Subject
  }

  type Subject {
    _id: ID,
    name: String,
    createdAt: DateTime,
    updatedAt: DateTime
  }

  type Mutation {
    createSubject(name: String): Subject
    updateSubject(id: ID, name: String): Subject
    deleteSubject(id: ID): Subject
  }
`;

module.exports = { subjectTypeDefs: typeDefs };