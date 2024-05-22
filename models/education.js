module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    "educations",
    {
      //modal attribures are defined here
      class_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
      },
      passing_year: {
        type: DataTypes.STRING,
      },
      UserId: DataTypes.INTEGER,
    },
    
    {
      // additional options are defined here
      tableName: "educations",
      //timestamps:false
      // createdAt:false,
      // updatedAt:true
    }
  );

  // `sequelize.define` also returns the model
  //console.log(Contact === sequelize.models.User); // true

  return Education;
};
