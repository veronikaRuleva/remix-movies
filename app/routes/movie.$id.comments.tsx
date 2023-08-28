import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const data = await db.comment.findMany({
    where: {
      movieId: params.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ data });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      movieId: formData.get("id") as string,
    },
  });
  return json({ data });
};

const MovieComment = () => {
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="rounded-lg border p-3">
      <h1 className="mb-5 text-xl font-semibold">Your Opinion</h1>
      <div>
        <Form method="POST">
          <textarea
            name="comment"
            className="w-full rounded-lg border border-teal-500 p-2"
          ></textarea>
          <input type="hidden" name="id" value={id} />
          {navigation.state === "submitting" ? (
            <button
              type="button"
              disabled
              className="rounded-lg bg-teal-500 px-4 py-2 text-white"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-teal-500 px-4 py-2 text-white"
            >
              Add Comment
            </button>
          )}
        </Form>
        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieComment;
