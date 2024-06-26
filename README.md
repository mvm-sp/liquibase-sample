# liquibase-sample
tutorial para criar um controle de versão de banco de dados com o liquibase para Node

Liquibase pode ser utilizado com diversas linguagens, incluindo Node.js. A integração geralmente envolve configurar o Liquibase para ser executado como um processo separado ou via scripts que podem ser chamados a partir do código Node.js. Abaixo está um tutorial básico para configurar e usar o Liquibase com Node.js:

### Passo a Passo para Implementar Migrações com Liquibase em um Projeto Node.js

  **Instalar o Liquibase**:
   - Baixe o Liquibase do site oficial [Liquibase Downloads](https://www.liquibase.org/download).
   - Extraia o arquivo baixado para um diretório de sua escolha.
   - Adicione o diretório bin do Liquibase ao seu PATH do sistema para facilitar a execução dos comandos.

  **Configurar o Banco de Dados**:
   - Certifique-se de ter um banco de dados configurado (por exemplo, MySQL, PostgreSQL).
   - Crie um banco de dados para o seu projeto.
   - Este repositório possui um `shellscript` para facilitar a criação de um Banco De dados `PostgreSQL` no `Docker`  [db-start.sh](./db-start.sh) 

```shell
sh db-start.sh
```
  **Configurar um Projeto Node.js**:
   - Crie um novo projeto Node.js ou use um existente.
   - Instale as dependências necessárias (neste exemplo, vamos usar `pg` para PostgreSQL):

     ```sh
     npm init -y
     npm install pg
     npm install liquibase
     npm install --save node-liquibase
     ```
  **Criar o arquivo testing.js**

  ```javascript
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
  username: 'youruser',
  password: 'yourpassword',  
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
  ```
  **Criar o ChangeLog Master**:
   Criar oa arquivo index.ts

   ```javascript
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

   ```

**Criar o ChangeLog Master**:
   - No diretório raíz crie um arquivo chamado `db.changelog-master.xml` com o seguinte conteúdo:

     ```xml
     <databaseChangeLog
         xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
             http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">
     
         <include file="db.changelog-1.0.xml"/>
     </databaseChangeLog>
     ```
  **Criar o Arquivo de Migração (`db.changelog-1.0.xml`)**:
   - No mesmo diretório, crie um arquivo chamado `db.changelog-1.0.xml` com uma mudança simples, como a criação de uma tabela:

     ```xml
     <databaseChangeLog
         xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
             http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">
     
         <changeSet id="1" author="seu_nome">
             <createTable tableName="exemplo">
                 <column name="id" type="int">
                     <constraints primaryKey="true" nullable="false"/>
                 </column>
                 <column name="nome" type="varchar(255)">
                     <constraints nullable="false"/>
                 </column>
             </createTable>
         </changeSet>
     </databaseChangeLog>
     ```
  **Executar o typescript**:
```bash
npx ts-node --project ./tsconfig.json ./index.ts
```
  **Executar o Liquibase a partir do Node.js**:
   - Crie um script Node.js para executar os comandos do Liquibase. Aqui está um exemplo simples usando o módulo `child_process` do Node.js como o arquivo [testing.js](./testing.js) :

     
**Executar o Script**:
   - No terminal, execute o script Node.js criado:

     ```sh
     node testing.js
     ```

### Tutorial Completo

Para um tutorial mais detalhado, recomendo o seguinte link:
- [Using Liquibase with MySQL](https://docs.liquibase.com/start/tutorials/mysql.html) 

