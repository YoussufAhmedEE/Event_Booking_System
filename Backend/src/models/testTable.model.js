
/**************************************************** */
//this file was used to test Creation and deletion of tables in the database
/**************************************************** */

const { DataTypes } = require('sequelize');
const {db} = require('../config/database'); 

const Test = db.define('Test', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
});

createTable = async () => {
    try {
        await db.sync({ force: false }); 
        const newTest = await Test.create({
          name: "Youssuf"
        });
        console.log("Test table created successfully");
        console.log("added row:", newTest.toJSON());
  
      } catch (err) {
        console.error("Error creating table:", err);
      }
}

dropTable = async () => {
    try {
        await Test.drop();
        console.log("Test table dropped successfully");
    } catch (err) {
        console.error("Error dropping table:", err);
    }
}




module.exports = {Test, createTable, dropTable};
