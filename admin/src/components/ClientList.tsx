import { nanoid } from "nanoid";

const ClientList = ({ client, handleAcception }: any) => {
  const uniqueClients = Array.from(
    new Set(client.map((user: any) => user.user.id))
  ).map((id: any) => {
    return client.find((user: any) => user.user.id === id);
  });
  return (
    <div className="flex flex-col gap-y-2 overflow-y-auto">
      {client.length > 0 &&
        client !== null &&
        uniqueClients.map((user: any) => (
          <div
            className="cursor-pointer border border-gray-600 p-2 
                transition duration-200 hover:outline hover:outline-1 hover:outline-blue-500"
            key={nanoid()}
            onClick={() => handleAcception(user)}
          >
            <p className="mb-1 text-center font-bold">Requesting for support</p>
            <p className="flex justify-between">
              <span className="text-gray-400">User ID:</span>
              {user && user.user.id}
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">User:</span>
              {user && user.user.email}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ClientList;
