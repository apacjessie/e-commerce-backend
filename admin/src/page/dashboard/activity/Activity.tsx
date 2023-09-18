import axios from "axios";
import { useEffect, useState } from "react";

const EmptyState = () => {
  return (
    <>
      <h1 className="text-xl text-gray-400">
        The administrative account has not yet performed any activities.
      </h1>
    </>
  );
};

const Activity = () => {
  const [activity, setActivity] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/activity", {
        withCredentials: true,
      })
      .then(async (res) => {
        const data = await res.data;
        const sortArray = data.activity.sort((a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);

          return dateA.getTime() - dateB.getTime();
        });
        setActivity(sortArray.reverse());
      });
  }, []);

  const date = (string: string) => new Date(string).toLocaleString();
  return (
    <div className="flex h-full w-full flex-col  overflow-hidden">
      <h1 className="text-3xl font-bold tracking-wider">Activity log</h1>
      <div
        className="my-5 flex h-full w-full flex-col gap-y-3 bg-gray-800 p-5 px-10 
                     text-gray-200 shadow-xl"
      >
        <h1 className="text-3xl font-semibold">Admin</h1>
        <div
          className={`${
            activity === null ||
            (activity.length <= 0 && "items-center justify-center")
          } flex h-full w-full flex-col gap-y-1 px-5 py-2`}
        >
          {activity === null || activity.length <= 0 ? (
            <EmptyState />
          ) : (
            activity.map((act: any) => (
              <>
                <p className="flex items-end justify-between text-right text-gray-400">
                  {date(act.created_at)}
                  <span className="text-right text-gray-200">
                    {act.activity_message}
                  </span>
                </p>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
