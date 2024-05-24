module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      //modal attribures are defined here
      permanent_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_address: {
        type: DataTypes.STRING,
      },
      UserId: {
        type:DataTypes.INTEGER,
        allowNull:false
      }
    },
    {
      // additional options are defined here
      tableName: "contacts",
      //timestamps:false
      // createdAt:false,
      // updatedAt:true
    }
  );

  // `sequelize.define` also returns the model
  //console.log(Contact === sequelize.models.User); // true

  return Contact;
};
