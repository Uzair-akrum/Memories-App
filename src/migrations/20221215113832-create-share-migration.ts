'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Shares', {
       
    
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
          as: 'user'
        }
        
        
  
      },
    }) 
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Shares')
  },
};