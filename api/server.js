const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost';
// const url = 'mongodb://localhost/hotel';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/customertracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/customertracker';

let db;

let aboutMessage = "Customer Waiting List API v1.0";


const resolvers = {
  Query: {
    about: () => aboutMessage,
    customerList,
    customerFind,
  },
  Mutation: {
    setAboutMessage,
    customerAdd,
    customerDelete,

  },
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function customerValidate(customer) {
  const errors = [];
  if (customer.name == '') {
    errors.push('Field "name" can not be empty.');
  }
  if (customer.phone == '' || parseInt(customer.phone)<0) {
    errors.push('Field "phone" can not be empty or a negative number.');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}


async function customerList() {
  const customers = await db.collection('customers').find({}).toArray();
  return customers;
}

async function customerFind(_, { customer }) {
  customerValidate(customer);
  // let customers = [];
  // if(customer.name == null){
  //   customers = await db.collection('customers').find({phone: customer.phone}).toArray();
  // }
  // else if(customer.phone == null){
  //   customers = await db.collection('customers').find({name: customer.name}).toArray();
  // }
  // else{
  //   customers = await db.collection('customers').find({name: customer.name, phone: customer.phone}).toArray();
  // }
  let customers = await db.collection('customers').find({name: customer.name, phone: customer.phone}).toArray();
  return customers;
}


async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}


async function customerAdd(_, { customer }) {
  customerValidate(customer);
  customer.created = new Date().toLocaleString();
  customer.id = await getNextSequence('customer_counter');

  const result = await db.collection('customers').insertOne(customer);
  const savedcustomer = await db.collection('customers')
    .findOne({ _id: result.insertedId });
  return savedcustomer;
}

async function customerDelete(_, { customer }) {
  customerValidate(customer);
  const result = await db.collection('customers').deleteOne({name: customer.name, phone: customer.phone});
  return result;
}




async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db('hotel');
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();


server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(5000, function () {
      console.log('API server started on port 5000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
