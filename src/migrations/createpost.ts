'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
       
       
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
         userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: ' userid',
      },
    },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('posts')
  },
}