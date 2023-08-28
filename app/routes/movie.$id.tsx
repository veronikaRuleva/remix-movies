import { LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjQ2MzE2ODJiZTU2NTEyYjkwMTQ4NGI1OTZjNTA1ZCIsInN1YiI6IjY0ZWM0OWY4NTI1OGFlMDEyY2E2M2M2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ip0nwdUPUSSWAbf8eAYRk21xv0EBKUMJRrABaJQvDls",
      },
    },
  );

  return json(await url.json());
};

export const Movie = () => {
  const data = useLoaderData();

  console.log(data);
  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[40vh] w-full rounded-lg object-cover"
      />

      <h1 className="pt-5 text-center text-4xl font-bold">{data.title}</h1>

      <div className="mt-10 flex gap-x-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage:</span>{" "}
            <Link to={data.homepage} target="_blank">
              Link
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language:</span>{" "}
            {data.original_language}
          </h1>

          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>

          <p>
            <span className="underline">Release Date:</span> {data.release_date}
          </p>
        </div>

        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Movie;
