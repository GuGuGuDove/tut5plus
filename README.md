## Important Setups
### 0. Install MongoDB on your server
### 1. Start MongoDB service
```
systemctl mongod
```
### 2. Install JS packages, initialize MongoDB and start the server in *api* folder
```
cd api
npm install
mongo hotel scripts/init.mongo.js
npm start
```
This will create "hotel" database and tow collections "customer" and "counters" in it.
> **Note:** this project accesses hotel->customers and hotel->counters in MongoDB. 

### 3. Install JS packages and start server in *ui* folder
In a new shell:
```
cd ui
npm install
npm start
```
### 4. Compile JSX file to JS file in *ui* folder
In a new shell:
```
cd ui
npx babel src --out-dir public
```

### 5. The MongoDB CRUD test script can be found and executed by
```
cd api
node scripts/trymongo.js
```
All information will be printed in console.
