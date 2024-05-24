const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("world", "root", "21l31a05h8", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
  pool:{
    max:3,
    min:0,
    acquire:30000,
    idle:10000
  }
});

try {
  sequelize.authenticate();
  console.log("connection to db successful");
} catch (error) {
  console.log("unable to connect to database", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes);
db.contact = require("./contact")(sequelize, DataTypes);
db.education = require("./education")(sequelize, DataTypes);
db.customer = require("./customer")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);

db.userContacts = require("./userContacts")(
  sequelize,
  DataTypes,
  db.user,
  db.contact
);

const User_Profile = sequelize.define(
  "User_Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);

db.customer.belongsToMany(db.profile, {
  through: User_Profile,
  uniqueKey: "my_custom_unique",
});
db.profile.belongsToMany(db.customer, {
  through: User_Profile,
  uniqueKey: "my_custom_unique",
});

// db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactDetails'});

db.user.hasMany(db.contact, { foreignKey: "UserId" });
db.contactUser = db.contact.belongsTo(db.user, {
  foreignKey: "UserId",
  as: "users",
});

db.user.hasMany(db.education, { foreignKey: "UserId" });
db.education.belongsTo(db.user, { foreignKey: "UserId" });

// db.user.belongsToMany(db.contact, {through:'user_contacts'});
// db.contact.belongsToMany(db.user, {through:'user_contacts'});
// db.user.belongsToMany(db.contact, {through:db.userContacts});
// db.contact.belongsToMany(db.user, {through:db.userContacts});

db.DataTypes = DataTypes
db.sequelize.sync({ force: false });

module.exports = db;
