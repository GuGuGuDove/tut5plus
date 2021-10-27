## Important Setups

### 1. Start MongoDB service:
```
systemctl mongod
```
### 2. Run initial mongo script in api folder: 
```
cd api
mongo hotel scripts/init.mongo.js
```
This will create "hotel" database and tow collections "customer" and "counters" in it.
> **Note:** this project accesses hotel->customers and hotel->counters in MongoDB. 

### 3. Start server in both ''api'' and ''ui'' folder:
```
npm start
```
  In a new shell:
```
cd ui
npm start
```
### 4. The MongoDB CRUD test script can be found and executed by:
```
cd api
node scripts/trymongo.js
```
All information will be printed in console.
