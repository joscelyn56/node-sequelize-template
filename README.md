## Node Sequelize API
This is the api for the Rivers State app.

# Technologies
1. Nodejs
2. MySQL
3. Express
4. Sequelize

# Setup
**Install all dependencies**
<br>
    ```
    npm install
    ```
<br>
<!-- blank line -->
**Create a new .env file**
<!-- blank line -->
Set your node env variable (development, testing or production) in the .env\
    ```
        NODE_ENV=development
    ```
<!-- blank line -->
**Set your database config for your development environment in the config.js file**\
    ```
        The Path to config file = ./src/config/db/config.js
    ```
<!-- blank line -->
**Update the db config in the development object to connect to your local db**\
    ```
        "username": "Database User"
    ```\
    ```
        "password": "Database Password if any"
    ```\
    ```
        "database": "Database Name"
    ```\
    ```
        "host": "Database Local Host
    ```
<!-- blank line -->
**Setup MySQL database by configuring the .env file**\
    ```
        DB=Database Name
    ```\
    ```
        DB_USER=Database User
    ```\
    ```
        DB_PASSWORD=Database Password if Any
    ```\
    ```
        DB_PORT=3306
    ```\
    ```
        DB_HOST=127.0.0.1
    ```\
    ```
        PORT=Set Port for API to run on
    ```
<!-- blank line -->
**Run migrations using sequelize**\
    ```
        npx sequelize-cli db:migrate
    ```
<!-- blank line -->
**Run seeder to add default admin**\
    ```
        npx sequelize-cli db:seed:all
    ```

# Testing
To run test\
    ```
        npm run test
    ```