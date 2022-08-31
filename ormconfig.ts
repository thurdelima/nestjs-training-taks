// module.exports = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'thur',
//     password: '123123',
//     database: 'db_devtraining',
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/migrations/*.js'],
//     cli: {
//       migrationsDir: 'src/migrations',
//     },
//   };
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  //config local bd
  // type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'thur',
  // password: '123123',
  // database: 'db_devtraining',
  // synchronize: false,
  // logging: true,
  
  //config bd docker-compose
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  "entities": [
    "dist/**/*.entity.js"
  ],
  "migrations": [
    "dist/migrations/*.js"
  ],
  // "subscribers": [
  //     "src/subscriber/**/*.ts"
  // ],
});

export default dataSource;