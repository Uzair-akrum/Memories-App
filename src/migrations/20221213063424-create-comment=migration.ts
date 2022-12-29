'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Comments', {
       
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete:"cascade",

        references:{
          model:"Posts",
          key:'id',
        
        }
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete:"cascade",

        references:{
          model:"Users",
          key:'id',
        
        }
        
        
  
      },
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Comments')
  },
};