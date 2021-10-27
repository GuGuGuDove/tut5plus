# Hotel California International
<br>
##  Important Setups:
### 1. Start mongodb service: <br>

    ```
    systemctl mongod
    ```
    
### 2. Run initial mongo script in api folder: this will create "hotel" database and tow collections "customer" and "counters" collections in it. <br>

    ```
    cd api
    mongo hotel scripts/init.mongo.js
    ```
    
### 3. Start server in both api and ui: <br>

    ```
    npm start
    ```
    
    In a new shell:
    
    ```
    cd ui
    npm start
    ```
    
### 4. Always remember this project accesses hotel-customers and hotel-counters in mongodb. 
### 5. The Mongdb CRUD test script can be executed by: <br>

    ```
    cd api
    node scripts/trymongo.js 
    ```
    
    All information will be printed in console.
