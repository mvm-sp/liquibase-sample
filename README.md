# liquibase-sample
tutorial para criar um controle de versão de banco de dados com o liquibase para Node

Liquibase pode ser utilizado com diversas linguagens, incluindo Node.js. A integração geralmente envolve configurar o Liquibase para ser executado como um processo separado ou via scripts que podem ser chamados a partir do código Node.js. Abaixo está um tutorial básico para configurar e usar o Liquibase com Node.js:

### Passo a Passo para Implementar Migrações com Liquibase em um Projeto Node.js

1. **Instalar o Liquibase**:
   - Baixe o Liquibase do site oficial [Liquibase Downloads](https://www.liquibase.org/download).
   - Extraia o arquivo baixado para um diretório de sua escolha.
   - Adicione o diretório bin do Liquibase ao seu PATH do sistema para facilitar a execução dos comandos.

2. **Configurar o Banco de Dados**:
   - Certifique-se de ter um banco de dados configurado (por exemplo, MySQL, PostgreSQL).
   - Crie um banco de dados para o seu projeto.

3. **Configurar um Projeto Node.js**:
   - Crie um novo projeto Node.js ou use um existente.
   - Instale as dependências necessárias (neste exemplo, vamos usar `pg` para PostgreSQL):

     ```sh
     npm init -y
     npm install pg
     ```

4. **Criar Arquivo de Configuração (`liquibase.properties`)**:
   - Crie um arquivo chamado `liquibase.properties` no diretório raiz do seu projeto com as seguintes configurações:

     ```properties
     changeLogFile=src/main/resources/db/changelog/db.changelog-master.xml
     url=jdbc:postgresql://localhost:5432/seu_banco_de_dados
     username=seu_usuario
     password=sua_senha
     driver=org.postgresql.Driver
     ```

5. **Criar o ChangeLog Master**:
   - No diretório especificado (`src/main/resources/db/changelog/`), crie um arquivo chamado `db.changelog-master.xml` com o seguinte conteúdo:

     ```xml
     <databaseChangeLog
         xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
             http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">
     
         <include file="db.changelog-1.0.xml"/>
     </databaseChangeLog>
     ```

6. **Criar o Arquivo de Migração (`db.changelog-1.0.xml`)**:
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

7. **Executar o Liquibase a partir do Node.js**:
   - Crie um script Node.js para executar os comandos do Liquibase. Aqui está um exemplo simples usando o módulo `child_process` do Node.js:

     ```javascript
     const { exec } = require('child_process');

     exec('liquibase update', (error, stdout, stderr) => {
       if (error) {
         console.error(`Erro ao executar o Liquibase: ${error.message}`);
         return;
       }
       if (stderr) {
         console.error(`Erro: ${stderr}`);
         return;
       }
       console.log(`Resultado: ${stdout}`);
     });
     ```

8. **Executar o Script**:
   - No terminal, execute o script Node.js criado:

     ```sh
     node seu_script.js
     ```

### Tutorial Completo

Para um tutorial mais detalhado, recomendo o seguinte link:
- [Using Liquibase with Node.js](https://www.baeldung.com/liquibase-nodejs) (Note que este link é fictício para fins de exemplo; você pode procurar tutoriais similares online).

