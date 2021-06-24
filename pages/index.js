//import { useEffect, useState } from "react";

import { Fragment } from "react";
import Head from 'next/head';

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const Dummy_Meetups = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-gateway-of-india-mumbai.jpg",
//     address: "Some address 10 ,1234 some city",
//     description: "This is first Meet",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-red-fort-delhi.jpg",
//     address: "Some address 10 ,1234 some city",
//     description: "This is second Meet",
//   },
// ];

const HomePage = (props) => {
  //const [loadedMeetups , setLoadedMeetups] = useState([]);

  /* useEffect( () => {
        //send a http request and fetch data
        setLoadedMeetups(Dummy_Meetups);
    }
    ,[]);
    */

  return (
    <Fragment>
      <Head>
        <title>My Meetups</title>
        <meta
          name='description'
          content='Browse A huge list of highly active React meetups !'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;

//     //fetch data from an API
//     return {
//         props:{
//             meetups:Dummy_Meetups
//         }
//     };
// }

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://vishal:hG4Ebv9FssUurYS0@cluster0.s7j7n.mongodb.net/letsmeet?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

   const meetups = await meetupsCollection.find().toArray();
   client.close();

  return {
    props: {
      meetups: meetups.map((meetup)=>({
          title: meetup.title,
          address: meetup.address,
          image : meetup.image,
          id:meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
