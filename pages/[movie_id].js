import "tailwindcss/tailwind.css";
import Head from "next/head";

export default function MovieDetails({ movie }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {movie && (
        <>
          <div className="container mx-auto my-8">
            <h1 className="text-2xl">Movie Details For: {movie.title}</h1>
          </div>
          <div className="container mx-auto">
            <div className="flex flex-wrap my-8">
              <div className="w-1/2 p-8 border border-black">
                <img src={movie.poster} alt="movie poster" />
                <p className="text-xs ">Release date: {movie.year}</p>
                <p>IMDB Rating: {movie.imdb.rating}⭐️</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  // console.log(context.query.movie_id);

  const data = await fetch(
    `${process.env.APP}/api/moviedetails?movie_id=${params.movie_id}`
  );
  const movie = await data.json();

  return {
    props: { movie },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
