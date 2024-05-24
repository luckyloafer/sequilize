module.exports = (sequelize, DataTypes, User, Contact) => {
  const Profile = sequelize.define(
    "profile",
    {
      name: DataTypes.STRING,
    },
    { timestamps: false }
  );
  return Profile;
};
