import axios from "axios";
import { useEffect, useState } from "react";

const Card = ({ user }: { user: any }) => {
  const date = (string: string) => {
    return new Date(string).toDateString();
  };

  const tdStyle = "border-r-2 border-gray-700 p-1";

  return (
    <>
      <tr className="odd:bg-gray-700 even:bg-gray-800">
        <td className={tdStyle}>{user.id}</td>
        <td className={tdStyle}>{user.fullname}</td>
        <td className={tdStyle}>{user.email}</td>
        <td className={tdStyle}>{user.mobile}</td>
        <td className={tdStyle}>{user.address}</td>
        <td className={tdStyle}>{date(user.join_at)}</td>
      </tr>
    </>
  );
};

const Customers = () => {
  const [users, setUsers] = useState<any>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/getUsers").then(async (res) => {
      const data = await res.data;
      setUsers(data);
    });
  }, []);

  const filteredUsers = (users || []).filter(
    (user: any) =>
      user.id.toString().includes(search) ||
      user.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const thStyle = "border-r-2 border-gray-700 p-1 bg-gray-900 ";

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-wider">Customers</h1>
      <input
        className="mx-2 mt-5 w-full rounded-sm border-none bg-neutral-200 p-2 text-base text-gray-950
                 outline-none outline-offset-2 focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200"
        type="text"
        placeholder="Search user id or user fullname"
        id="password"
        onChange={(e) => setSearch(e.target.value)}
        required
      ></input>
      <table className="mx-2 mt-8 w-full border-collapse text-gray-200">
        <tbody>
          <tr>
            <th className={thStyle}>User ID</th>
            <th className={thStyle}>Fullname</th>
            <th className={thStyle}>Email</th>
            <th className={thStyle}>Mobile</th>
            <th className={thStyle}>Address</th>
            <th className={thStyle}>Join_at</th>
          </tr>
          {users &&
            filteredUsers.map((user: any) => (
              <Card key={user.id} user={user} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
