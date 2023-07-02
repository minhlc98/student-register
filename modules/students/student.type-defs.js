const gql = require("graphql-tag");

const typeDefs = gql`
  scalar DateTime

  type Query {
    students(page: Int, limit: Int): [Student]
    student(id: ID!): Student
  }

  type Student {
    _id: ID,
    firstName: String,
    lastName: String,
    birthday: DateTime,
    createdAt: DateTime,
    updatedAt: DateTime
  }

  type Mutation {
    createStudent(firstName: String!, lastName: String!, birthday: DateTime): Student
    updateStudent(id: ID, firstName: String, lastName: String, birthday: DateTime): Student
    deleteStudent(id: ID): Student
  }
`;

module.exports = { studentTypeDefs: typeDefs };