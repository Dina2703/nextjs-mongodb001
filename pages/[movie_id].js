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
  // console.log(context.query.movie_id);
  const data = await fetch(
    `http://localhost:3000/api/moviedetails?movie_id=${context.query.movie_id}`
  );
  const movie = await data.json();

  return {
    props: { movie },
  };
}
