import { ConnectionOptions } from "typeorm";

import { entities } from "@/utils/typeorm";

const Configs = {
  Client: {
    OwnerIDs: ["748366237788012695"]
  },
  Database: {
    type: "mysql",
    host: process.env.MYSQL_DATABASE_HOST,
    port: Number(process.env.MYSQL_DATABASE_PORT),
    username: process.env.MYSQL_DATABASE_USERNAME,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    entities,
    synchronize: true
  } as ConnectionOptions
};

export default Configs;
