import "tailwindcss/tailwind.css";
import Head from "next/head";

export default function MovieDetails({ movie }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <h1 className="text-2xl">Movie Details For: {movie.title}</h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap my-8">
          {movie && (
            <div className="w-1/2 p-8 border border-black">
              <img src={movie.poster} alt="movie poster" />
              <p className="text-xs ">Release date: {movie.year}</p>
              <p>IMDB Rating: {movie.imdb.rating}⭐️</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(
    "http://localhost:3000/api/moviedetails?movie_id=573a13e9f29313caabdcc734"
  );
  const movie = await data.json();
  console.log(movie);
  return {
    props: { movie },
  };
}
