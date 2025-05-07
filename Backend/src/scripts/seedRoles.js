const { Role } = require("../models/role.model");
const { db } = require("../config/database");
const { ROLES_ENUM } = require("../models/role.model");

const seedRoles = async () => {

  for (const name of ROLES_ENUM) {
    const exists = await Role.findOne({ where: { name } });
    if (!exists) {
      await Role.create({ name });
      console.log(`✅ Role '${name}' created`);
    }
  }
};

seedRoles();

// module.exports = seedRoles;
