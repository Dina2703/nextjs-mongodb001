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

      <div className="container mx-auto">
        <div className="flex flex-wrap my-8">
          {movies &&
            movies.map((movie) => (
              <div className="w-1/4 p-8 border border-black" key={movie._id}>
                <h2 className="font-bold text-gray-600">{movie.title}</h2>
                <p className="text-xs ">Release date: {movie.year}</p>
                <p>IMDB Rating: {movie.imdb.rating}⭐️</p>
                <p className="text-xs">Movie_ID: {movie._id}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const data = await db.collection("movies").find({}).limit(2).toArray();
    const movies = JSON.parse(JSON.stringify(data));
    console.log(`print ${movies}`);
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    return {
      props: {
        movies: movies,
      },
    };
  } catch (e) {
    console.error(e);
  }
}
