var db = require("../models");

var DataTypes = db.DataTypes
var User = db.user;
var Contact = db.contact;
var Education = db.education;
var Customer = db.customer;
var Profile = db.profile;

const { Sequelize, where, QueryTypes } = require("sequelize");

var addUser = async (req, res) => {
  const jane = await User.create({ firstName: "lakshman", lastName: "murthy" });
  console.log(jane instanceof User); // true
  console.log(jane.firstName); // "Jane"
  jane.update({ firstName: "patnana", lastName: "babuuuuu" });
  await jane.save();
  console.log("Jane was saved to the database!");
  await jane.reload();
  console.log(jane.toJSON()); // This is good!
  console.log(JSON.stringify(jane, null, 4)); // This is also good!
  res.status(200).json(jane.toJSON());
};

var getUsers = async (req, res) => {
  const data = await User.findAll({});

  res.status(200).json({ data: data });
};

var getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data });
};

var postUsers = async (req, res) => {
  var postData = req.body;
  if (postData.length > 1) {
    var data = await User.bulkCreate(postData);
  } else {
    var data = await User.create(postData);
  }

  res.status(200).json({ data: data });
};

var deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data });
};

var patchUser = async (req, res) => {
  var updatedData = req.body;
  const data = await User.update(updatedData, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: data });
};

var queryUser = async (req, res) => {
  // const data = await User.create({
  //     firstName:"patnana",
  //     lastName:"vedha"
  // }, {fields:['firstName']})

  const data = await User.findAll({
    attributes: [
      ["firstName", "first_name"],
      [Sequelize.fn("COUNT", Sequelize.col("firstName")), "count"],
    ],
    group: ["firstName"],
  });
  res.status(200).json({ data: data });
};

var getSetVirtual = async (req, res) => {
  const data = await User.findAll({
    where: { firstName: "patnana" },
  });

  // const data = await User.create({
  //     firstName:'alaloya',
  //     lastName: 'ameh'
  // })
  res.status(200).json({ data: data });
};

var rawQueriesUser = async (req, res) => {
  const users = await db.sequelize.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
    model: User,
    mapToModel: true,
  });

  res.status(200).json({ data: users });
};

var oneToOneUser = async (req, res) => {
  //   var data = await User.create({ firstName: "Rahul2", lastName: "kumar2" });
  //   if (data && data.id) {
  //     await Contact.create({
  //       permanent_address: "abc2",
  //       current_address: "xyz2",
  //       user_id: data.id,
  //     });
  //   }
  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        as: "contactDetails",
        attributes: ["permanent_address", "current_address"],
      },
    ],
    where: { id: 2 },
  });

  res.status(200).json({ data: data });
};

var oneToMany = async (req, res) => {
  // var data = Contact.create({permanent_address:'aganampudi',current_address:'hyderabad',
  //     'user_id':2
  // })
  // var data = await User.findAll({
  //     attributes:['firstName','lastName'],
  //     include:[{
  //         model:Contact,
  //         as:'contactDetails',
  //         attributes:['permanent_address','current_address']
  //     }],
  //     where:{id:2}
  //  })
  var data = await Contact.findAll({
    attributes: ["permanent_address", "current_address"],
    include: [
      {
        model: User,
        as: "userDetails",
        attributes: ["firstName", "lastName"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

var manyToMany = async (req, res) => {
  // var data = await User.create({ firstName: "jayanth", lastName: "kumar" });
  // if (data && data.id) {
  //   await Contact.create({
  //     permanent_address: "xy",
  //     current_address: "zx",
  //   });
  // }
  // var data = await Contact.findAll({
  //     attributes:['permanent_address','current_address'],
  //     include:[{
  //         model:User,
  //         attributes:['firstName','lastName']
  //     }],

  //  })

  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,

        attributes: ["permanent_address", "current_address"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

var loadingUser = async (req, res) => {
  // var data = await User.create({ firstName: "jayanth", lastName: "kumar" });
  // if (data && data.id) {
  //   await Contact.create({
  //     permanent_address: "ab",
  //     current_address: "cd",
  //     UserId:data.id
  //   });
  // }

  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,

        attributes: ["permanent_address", "current_address"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

var eagerUser = async (req, res) => {
  var data = await User.findAll({
    include: [
      {
        model: Contact,
        required: false, // if required is not included(left join works), if true(inner join), else (outer join)
        right: true, //right join
      },
      {
        model: Education,
      },
    ],
  });

  res.status(200).json({ data: data });
};

var creatorUser = async (req, res) => {
  // var data = await User.create({ firstName: "jayanth", lastName: "kumar" });
  // if (data && data.id) {
  //   await Contact.create({
  //     permanent_address: "ab",
  //     current_address: "cd",
  //     UserId: data.id,
  //   });
  // }

  //for single data entry
  await Contact.create(
    {
      permanent_address: "pq",
      current_address: "rs",
      users: {
        firstName: "rahul",
        lastName: "kumar",
      },
    },
    {
      include: [db.contactUser],
    }
  );

  //for bulk data entry
  //   await Contact.bulkCreate([
  //     {
  //     permanent_address:'pq',
  //     current_address:'rs',
  //     users:{
  //       firstName:'rahul',
  //       lastName:'kumar'
  //     }
  //   },
  //   {
  //     permanent_address:'ab',
  //     current_address:'cd',
  //     users:{
  //       firstName:'jayanth',
  //       lastName:'kumar'
  //     }
  //   },

  // ],{
  //     include:[db.contactUser]
  //   })

  var data = await User.findAll({
    include: [
      {
        model: Contact,
        required: false, // if required is not included(left join works), if true(inner join), else (outer join)
        right: true, //right join
      },
      {
        model: Education,
      },
    ],
  });

  res.status(200).json({ data: data });
};

var mnAssociationsUser = async (req, res) => {
  // const amidala = await Customer.create({ username: "p4dm3", points: 1000 });
  // const queen = await Profile.create({ name: "Queen" });
  // await amidala.addProfile(queen, { through: { selfGranted: false } });
  // const result = await Customer.findOne({
  //   where: { username: "p4dm3" },
  //   include: Profile,
  // });
  const amidala = await Customer.create(
    {
      username: "p4dm3",
      points: 1000,
      profiles: [
        {
          name: "Queen",
          User_Profile: {
            selfGranted: true,
          },
        },
      ],
    },
    {
      include: Profile,
    }
  );

  const result = await Customer.findOne({
    where: { username: "p4dm3" },
    include: Profile,
  });
  res.status(200).json({ data: result });
};

var transactionsUser = async (req, res) => {
  var t = await db.sequelize.transaction();

  var data = await User.create({ firstName: "Rahul", lastName: "kumar" });
  if (data && data.id) {
    try {
      await Contact.create({
        permanent_address: "abc2",
        current_address: "xyz2",
        UserId: null,
      });

      await t.commit();
      data["transaction_status"] = "commit";
    } catch (error) {
      await t.rollback();
      data["transaction_status"] = "rollback";
      await User.destroy({
        where: {
          id: data.id,
        },
      });
    }
  }

  res.status(200).json({ data: data });
};

var queryInterfaceUser = async (req, res) => {
  var data = {};
   const queryInterface = db.sequelize.getQueryInterface();
  // queryInterface.createTable('Person', {
  //   name: DataTypes.STRING,
  //   isBetaMember: {
  //     type: DataTypes.BOOLEAN,
  //     defaultValue: false,
  //     allowNull: false,
  //   },
  // });
  queryInterface.addColumn('Person', 'petName', { type: DataTypes.STRING });
  res.status(200).json({ data: data });
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUsers,
  deleteUser,
  patchUser,
  queryUser,
  getSetVirtual,
  rawQueriesUser,
  oneToOneUser,
  oneToMany,
  manyToMany,
  loadingUser,
  eagerUser,
  creatorUser,
  mnAssociationsUser,
  transactionsUser,
  queryInterfaceUser,
};
