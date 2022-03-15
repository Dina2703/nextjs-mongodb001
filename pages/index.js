import "tailwindcss/tailwind.css";
import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home({ movies }) {
  console.log(movies);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="text-2xl">
          Building modern Apps with Next.js and MongoDB
        </h1>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const data = await db.collection("movies").find({}).limit(20).toArray();
  const movies = JSON.parse(JSON.stringify(data));
  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  return {
    props: { movies },
  };
}
