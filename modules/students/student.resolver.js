const { StudentModel } = require("./Student.model");
const { DateTime } = require('../../scalars/datetime');
// GraphQL Resolvers
const resolvers = {
  DateTime,
  Query: {
    students: async (parent, args) => {
      const { page = 1, limit = 20 } = args;
      const skip = (page - 1) * limit;
      const students = await StudentModel.find({}).limit(limit).skip(skip).lean(true);
      return students;
    },
    student: async (parent, args) => {
      const { id } = args;
      const student = await StudentModel.findOne({ _id: id }).lean(true);
      return student;
    },
  },
  Mutation: {
    createStudent: async (parent, args) => {
      const { firstName, lastName, birthday } = args;
      const student = new StudentModel({ firstName, lastName, birthday });
      await student.save();
      return student;
    },
    updateStudent: async (parent, args) => {
      const { id, firstName, lastName, birthday } = args;
      const updatedStudent = await StudentModel.findOneAndUpdate(
        { _id: id }, 
        { 
          $set: {
            firstName,
            lastName,
            birthday,
            updatedAt: new Date()
          }
        },
        { new: true, lean: true }
      );
      if (!updatedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return updatedStudent;
    },
    deleteStudent: async (parent, args) => {
      const { id } = args;
      const deletedStudent = await StudentModel.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(`Student with ID ${id} not found`);
      }
      return deletedStudent;
    },
  }
};

module.exports = { studentResolvers: resolvers };