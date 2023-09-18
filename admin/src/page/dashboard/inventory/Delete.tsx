import { FormEvent, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import EmptyState from "../../../components/EmptyState";
import { buttonClass } from "../../../styles/Styles";

const ProductInfo = ({ product, handleDelete }: any) => {
  const [warning, setWarning] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <div className="text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Product ID</h1>
          {product.id}
        </div>
        <div className="text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Product name</h1>
          {product.name}
        </div>
        <div className="text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Product Category</h1>
          {product.category.toUpperCase()}
        </div>
        <div className="text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Product Gender Category</h1>
          {product.gender.toUpperCase()}
        </div>
        <div className="text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Product price</h1>
          PHP {product.price.toLocaleString()}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-right">
        <div>
          <h1 className="text-base text-gray-400">Product rate</h1>
          {product.rate} / 5
        </div>
        <div>
          <h1 className="text-base text-gray-400">
            Number of users rate the product
          </h1>
          {product.count} User
        </div>
        <div className="text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Stock ID</h1>
          {product.stocks.id}
        </div>
        <div className="flex flex-col items-end text-lg text-gray-200">
          <h1 className="text-base text-gray-400">Available stocks</h1>
          <div className=" w-28">
            <p className="flex justify-between">
              <span>Small</span>
              {product.stocks.small}
            </p>
            <p className="flex justify-between">
              <span>Medium</span> {product.stocks.medium}
            </p>
            <p className="flex  justify-between">
              <span>Large</span> {product.stocks.large}
            </p>
            <p className="flex justify-between">
              <span>XL</span> {product.stocks.xl}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex h-fit w-full justify-end gap-x-4">
        {warning ? (
          <div className="flex flex-col">
            <p>Are you sure you want to delete this product?</p>
            <div className="grid grid-cols-2 gap-x-3">
              <button
                className="w-full bg-red-600 py-1 font-bold uppercase"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="w-full bg-blue-700 py-1 font-bold uppercase"
                onClick={() => setWarning((prev) => !prev)}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <button
            className={buttonClass}
            onClick={() => setWarning((prev) => !prev)}
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
};

const Delete = () => {
  const [error, setError] = useState<any>({ value: false, message: "" });
  const [id, setID] = useState<string>("");
  const [product, setProduct] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id === "")
      return setError({ value: true, message: "Please enter the Product ID" });

    const response = await axios.get(
      `http://localhost:3000/api/getProduct/${id}`,
      { withCredentials: true }
    );
    const data = await response.data;
    if (data.status === "fail") {
      setProduct(null);
      return setError({
        value: true,
        message: "Product with that ID does not exist.",
      });
    }
    setProduct(data);
    setError({ value: false, message: "" });
  };

  const handleDelete = async () => {
    const ID = product.id;
    const response = await axios.delete(
      `http://localhost:3000/api/admin/delete?id=${ID}`,
      { withCredentials: true }
    );
    const data = await response.data;
    if (data.status === "fail")
      return setError({
        value: true,
        message: "There seems to be a problem deleting this product.",
      });
    setError({ value: false, message: "" });
    setProduct(null);
  };

  return (
    <div className="flex h-full w-full flex-col  overflow-hidden">
      <h1 className="text-3xl font-bold tracking-wider">
        Inventory<span className="text-xl">/Delete</span>
      </h1>
      <div className="my-5 flex h-full w-full flex-col  bg-gray-800 p-5 text-gray-200 shadow-xl">
        <form
          className="flex w-full flex-col px-5"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-end gap-5 ">
            <div className="flex w-full flex-col">
              <label htmlFor="search-id" className="text-base font-medium">
                Search Product ID
              </label>
              <input
                className="w-full rounded-sm border-none bg-neutral-200 p-1 px-2 text-lg
                 text-gray-950 outline-none outline-offset-2 
                 focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200"
                type="text"
                id="search-id"
                required
                onChange={(e: any) => setID(e.target.value)}
              ></input>
            </div>
            <button
              className="mt-2 h-fit w-40  bg-blue-700 px-5 py-1.5 font-sans text-base 
            font-bold uppercase transition-all duration-100 active:bg-blue-600"
            >
              Find
            </button>
          </div>
          {error.value && (
            <p className=" mt-2 flex items-center gap-1 text-base text-red-500">
              <BiErrorCircle />
              {error.message}
            </p>
          )}
        </form>
        <div className="radius-xl my-3 h-[.1rem] w-full bg-gray-700"></div>
        <div
          className={`${
            product === null
              ? "flex flex-col items-center justify-center"
              : "grid grid-cols-2 px-5 py-1"
          } h-full w-full`}
        >
          {product === null ? (
            <EmptyState message="Search a Product ID to delete." />
          ) : (
            <ProductInfo product={product} handleDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Delete;
