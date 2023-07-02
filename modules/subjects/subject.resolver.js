const { SubjectModel } = require("./Subject.model");
const { DateTime } = require('../../scalars/datetime');
// GraphQL Resolvers
const resolvers = {
  DateTime,
  Query: {
    subjects: async (parent, args) => {
      const { page = 1, limit = 20 } = args;
      const skip = (page - 1) * limit;
      const subjects = await SubjectModel.find({}).limit(limit).skip(skip).lean(true);
      return subjects;
    },
    subject: async (parent, args) => {
      const { id } = args;
      const subject = await SubjectModel.findOne({ _id: id }).lean(true);
      return subject;
    },
  },
  Mutation: {
    createSubject: async (parent, args) => {
      const { name } = args;
      const subject = new SubjectModel({ name });
      await subject.save();
      return subject;
    },
    updateSubject: async (parent, args) => {
      const { id, name } = args;
      const updatedSubject = await SubjectModel.findOneAndUpdate(
        { _id: id }, 
        { 
          $set: {
            name,
            updatedAt: new Date()
          }
        },
        { new: true, lean: true }
      );
      if (!updatedSubject) {
        throw new Error(`Subject with ID ${id} not found`);
      }
      return updatedSubject;
    },
    deleteSubject: async (parent, args) => {
      const { id } = args;
      const deletedSubject = await SubjectModel.findByIdAndDelete(id);
      if (!deletedSubject) {
        throw new Error(`Subject with ID ${id} not found`);
      }
      return deletedSubject;
    },
  }
};

module.exports = { subjectResolvers: resolvers };