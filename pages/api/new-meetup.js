//  post---> /api/new-meetup

import { MongoClient } from "mongodb";
import { async } from "regenerator-runtime";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://vishal:hG4Ebv9FssUurYS0@cluster0.s7j7n.mongodb.net/letsmeet?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

        res.status(201).json({message : 'meetup inserted'});

  }
};

export default handler;
