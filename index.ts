import { Liquibase, LiquibaseConfig, LiquibaseLogLevels, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';

const myConfig: LiquibaseConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './resources/db/changelog/db.changelog-1.0.xml',
  url: 'jdbc:postgresql://localhost:5432/postgres',
  username: 'youruser',
  password: 'yourpassword',
  liquibaseSchemaName: 'public',
  logLevel: LiquibaseLogLevels.Off,
}
const inst = new Liquibase(myConfig);

inst.status();
