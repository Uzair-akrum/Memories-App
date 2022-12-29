'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ProductTag', {
       
      postid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
          model:"Posts",
          key:'id',
        
        }
        
        
  
      },
      tagid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references:{
            model:"tagid",
            key:'id',
          
          }
          
          
    
        },
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('ProductTag')
  },
};