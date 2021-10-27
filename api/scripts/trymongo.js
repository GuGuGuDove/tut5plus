const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/hotel';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';


async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('try');

    const customer1 = { phone: 123456, name: 'Big Dad'};
    const customer2 = { phone: 911, name: 'Small Dad'};
    const customer3 = { phone: 110, name: 'Medium Dad'};

    // const result = await collection.insertOne(customer1);
    // console.log('Result of insert:\n', result.insertedId);

    // const docs = await collection.find({ _id: result.insertedId }).toArray();
    // console.log('Result of find:\n', docs)


    //remove exsting data
    await collection.remove();
    console.log('\nAll Old Data Removed.\n');

    // for C
    await collection.insertMany([customer1, customer2, customer3]);
    //print data
    const data_c = await collection.find().toArray();
    console.log('Created 3 records:\n', data_c);

    //for R
    const data_r = await collection.find({ phone: 110 }).toArray();
    console.log('Retrieved one record:\n', data_r);

    // for U
    await collection.updateOne({ phone: 911 }, { $set: {name: 'Large Dad' } });
    const data_u = await collection.find().toArray();
    console.log('Updated one record:\n', data_u);

    // for D
    await collection.deleteOne({ name: 'Big Dad', phone:123456 });
    const data_d = await collection.find().toArray();
    console.log('Deleted one record:\n', data_d);

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();
