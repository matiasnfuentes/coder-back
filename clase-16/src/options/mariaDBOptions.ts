import { DbOptions } from "./types";

export const mariaDBOptions: DbOptions = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "persistencia2021",
    database: "test",
  },
};
