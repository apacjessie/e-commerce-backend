import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ prod }: { prod: any }) => {
  const tdStyle = "border-r-2 border-gray-700 p-1";

  return (
    <>
      <tr className="odd:bg-gray-700 even:bg-gray-800">
        <td className={tdStyle}>{prod.id}</td>
        <td className={tdStyle}>{prod.name}</td>
        <td className={tdStyle}>{prod.category}</td>
        <td className={tdStyle}>PHP {prod.price}</td>
        <td className={tdStyle}>{prod.stocks.small} pc</td>
        <td className={tdStyle}>{prod.stocks.medium} pc</td>
        <td className={tdStyle}>{prod.stocks.large} pc</td>
        <td className={tdStyle}>{prod.stocks.xl} pc</td>
      </tr>
    </>
  );
};

const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: any) => {
  const posts = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    posts.push(i);
  }

  return (
    <div className="flex gap-x-2 p-2 py-5">
      {posts &&
        posts.map((n: number) => (
          <button
            key={n}
            className={`${
              currentPage === n && "underline underline-offset-4 "
            } px-2.5 text-xl text-gray-800
          decoration-gray-800 `}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </button>
        ))}
    </div>
  );
};

const Inventory = () => {
  const [products, setProducts] = useState<any>(null);
  const [search, setSearch] = useState<string>("");

  const [postsPerPage, setPostsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    if (products === null) {
      axios
        .get("http://localhost:3000/api/getProducts", {
          withCredentials: true,
        })
        .then(async (res: any) => {
          const data = await res.data;
          setProducts(data);
        });
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredProduct = (products || []).filter(
    (prod: any) =>
      prod.id.toString().includes(search) ||
      prod.name.toLowerCase().includes(search.toLowerCase())
  );

  const thStyle = "border-r-2 border-gray-700 p-1 bg-gray-900 ";

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-wider">Inventory</h1>
      <input
        className="mx-2 mt-5 w-full rounded-sm border-none bg-neutral-200 p-2 text-base text-gray-950
                 outline-none outline-offset-2 focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200"
        type="text"
        placeholder="Search product id or product name"
        id="password"
        onChange={(e) => setSearch(e.target.value)}
        required
      ></input>
      <table className="mx-2 mt-8 w-full border-collapse bg-gray-800 text-gray-300">
        <tbody>
          <tr>
            <th className={thStyle}>Product ID</th>
            <th className={thStyle}>Name</th>
            <th className={thStyle}>Category</th>
            <th className={thStyle}>Price</th>
            <th className={thStyle}>Small</th>
            <th className={thStyle}>Medium</th>
            <th className={thStyle}>Large</th>
            <th className={thStyle}>XL</th>
          </tr>
          {products &&
            filteredProduct
              .map((prod: any) => <Card key={prod.id} prod={prod} />)
              .slice(firstPostIndex, lastPostIndex)}
        </tbody>
      </table>
      <Pagination
        totalPosts={products && filteredProduct.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Inventory;
