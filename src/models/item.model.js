import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("new", "done"),
      defaultValue: "new",
    },
  },
  {
    tableName: "items",
    timestamps: false,
  }
);

export default Item;
