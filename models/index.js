const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("world", "root", "21l31a05h8", {
  host: "localhost",
  logging:false,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("connection to db successful");
} catch (error) {
  console.log("unable to connect to database", error);
}

const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes)
db.contact = require('./contact')(sequelize, DataTypes)
db.education = require('./education')(sequelize, DataTypes)

 db.userContacts = require('./userContacts')(sequelize, DataTypes,db.user,db.contact)


// db.user.hasMany(db.contact,{foreignKey: 'user_id',as:'contactDetails'});

db.user.hasMany(db.contact,{foreignKey: 'UserId'});
db.contactUser = db.contact.belongsTo(db.user,{foreignKey: 'UserId',as:'users'});

db.user.hasMany(db.education,{foreignKey: 'UserId'});
db.education.belongsTo(db.user,{foreignKey: 'UserId'});

// db.user.belongsToMany(db.contact, {through:'user_contacts'});
// db.contact.belongsToMany(db.user, {through:'user_contacts'});
// db.user.belongsToMany(db.contact, {through:db.userContacts});
// db.contact.belongsToMany(db.user, {through:db.userContacts});


db.sequelize.sync({ force: false});


module.exports = db;
