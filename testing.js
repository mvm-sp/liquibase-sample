const { execSync } = require('child_process');
const path = require('path');

const POSTGRESQL_DEFAULT_CONFIG = require('node-liquibase').POSTGRESQL_DEFAULT_CONFIG;

const runCommand = (command) => {
  console.log(`Running command: ${command}`);
  try {
    const stdout = execSync(command);
    console.log(`Command completed successfully. Stdout: ${stdout.toString()}`);
    return stdout.toString();
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(`Error: ${error.message}`);
    console.error(`Stdout: ${error.stdout ? error.stdout.toString() : 'N/A'}`);
    console.error(`Stderr: ${error.stderr ? error.stderr.toString() : 'N/A'}`);
    throw error;
  }
};

// Ensure the path to changelog.xml is absolute
const myConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: 'db.changelog-master.xml',
  url: 'jdbc:postgresql://localhost:5432/postgres',
  username: 'postgres',
  password: 'posgrespw',  
};

const checkLiquibaseVersion = () => {
  const versionCommand = `liquibase --version`;

  try {
    const versionOutput = runCommand(versionCommand);
    console.log(`Liquibase version: ${versionOutput}`);
  } catch (error) {
    console.error(`Error checking Liquibase version: ${error.message}`);
  }
};

const runStatus = () => {
  const statusCommand = `liquibase --logLevel=debug --url=${myConfig.url} --username=${myConfig.username} --password=${myConfig.password} --changeLogFile=${myConfig.changeLogFile} status`;

  console.log(`Running status command: ${statusCommand}`);

  try {
    const statusOutput = runCommand(statusCommand);
    console.log(`Liquibase status: ${statusOutput}`);
  } catch (error) {
    console.error(`Status command error: ${error.message}`);
  }
};

const runUpdate = () => {
  const updateCommand = `liquibase --logLevel=debug --url=${myConfig.url} --username=${myConfig.username} --password=${myConfig.password} --changeLogFile=${myConfig.changeLogFile} update`;

  console.log(`Running update command: ${updateCommand}`);

  try {
    const updateOutput = runCommand(updateCommand);
    console.log(`Liquibase update completed successfully: ${updateOutput}`);
  } catch (error) {
    console.error(`Update command error: ${error.message}`);
  }
};

// First, check Liquibase version
checkLiquibaseVersion();

// Then, run status and update
runStatus();
runUpdate();
