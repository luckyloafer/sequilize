module.exports = (sequelize, DataTypes, User, Contact) => {
  const Customer = sequelize.define(
    "customers",
    {
      username: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  return Customer;
};
