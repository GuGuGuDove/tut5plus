# Hotel California International

Important Setups:
1. Start mongodb service: <br>
    systemctl mongod
2. Run initial mongo script: this will create "hotel" database and tow collections "customer" and "counters" collections in it. <br>
    mongo hotel scripts/init.mongo.js
3. Start server: <br>
    npm start
4. Always remember this project accesses hotel-customer and hotel-counters in mongodb. 
5. The Mongdb CRUD test script can be executed by: <br>
    node scripts/trymongo.js (All information will be printed in console.)  
