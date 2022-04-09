import { DbOptions } from "./types";

export const sqlLiteOptions: DbOptions = {
  client: "sqlite3",
  connection: {
    filename: __dirname + "/../DB/mydb.sqlite",
  },
  useAsDefault: true,
};
