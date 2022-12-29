"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Posts", {
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

      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },

      userid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "cascade",
        references: {
          model: "Users",
          key: "id",
          as: " userid",
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
      sharedFrom: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "cascade",
        references: {
          model: "Posts",
          key: "id",
        },
      },
    });
    await queryInterface.addColumn("Posts", "sharedFrom", {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "cascade",
      references: {
        model: "Posts",
        key: "id",
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Posts");
  },
};
