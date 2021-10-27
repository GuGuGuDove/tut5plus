/*
 * should create collections named "counters" and "customers"  frst
 * localhost:
 *   mongo hotel scripts/init.mongo.js
 */


db.createCollection('customers')
db.createCollection('counters')

db.customers.remove({});
db.counters.remove({});

const customerDB = [
  {
    id: 1, name: 'Ravan', phone: 110,
    created: "10/25/2021, 2:26:10 AM", 
  },

  {
    id: 2, name: 'Eddie', phone: 911,
    created: "10/26/2021, 3:26:10 AM",
  },
];

db.customers.insertMany(customerDB);
const count = db.customers.count();
print('Inserted', count, 'customers');

db.counters.remove({ _id: 'customer_counter' });
db.counters.insert({ _id: 'customer_counter', current: count });
