import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { buttonClass, inputClass } from "../../../styles/Styles";
import EmptyState from "../../../components/EmptyState";

const h1Styles = "flex flex-col items-center text-2xl text-gray-200 font-bold";
const stockInput = `w-28 rounded-sm border-none bg-neutral-200 p-1 px-2 text- xl
text-gray-950 outline-none outline-offset-2 text-center
focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200`;

const StockForm = ({ stock }: any) => {
  const [update, setUpdate] = useState<any>(false);
  const [error, setError] = useState<any>({ error: false, message: "" });
  const [success, setSuccess] = useState<boolean>(false);
  const [stockSize, setStockSize] = useState<any>({
    small: stock.stock_small,
    medium: stock.stock_medium,
    large: stock.stock_large,
    xl: stock.stock_xl,
  });

  useEffect(() => {
    setStockSize({
      small: stock.stock_small,
      medium: stock.stock_medium,
      large: stock.stock_large,
      xl: stock.stock_xl,
    });
    setUpdate(false);
    setError({ value: false, message: "" });
    setSuccess(false);
  }, [stock]);

  const isValidate = (arr: any) => {
    const isInvalid = arr.filter((size: any) => size === "" || size < 0);
    if (isInvalid.length) return false;
    return true;
  };

  const noChange = (arr: any) => {
    const arrayToCompare = [
      stock.stock_small,
      stock.stock_medium,
      stock.stock_large,
      stock.stock_xl,
    ];

    return arr.toString() == arrayToCompare.toString();
  };

  const handleSubmit = async () => {
    setSuccess(false);
    const array = [
      stockSize.small,
      stockSize.medium,
      stockSize.large,
      stockSize.xl,
    ];
    if (!isValidate(array))
      return setError({ value: true, message: "Please fill up all the input" });
    if (noChange(array))
      return setError({ value: true, message: "No changes has been made" });

    setError({ value: false, message: "" });

    const formData = {
      stock_id: stock.stock_id,
      product_id: stock.product_id,
      s: stockSize.small,
      m: stockSize.medium,
      l: stockSize.large,
      xl: stockSize.xl,
    };

    const response = await axios.post(
      "http://localhost:3000/api/admin/updateStock",
      formData,
      {
        withCredentials: true,
      }
    );
    const data = await response.data;
    if (data.status === "success") {
      setUpdate((prev: boolean) => !prev);
      setSuccess(true);
    }
  };

  return (
    <div key={stock.stock_id} className="flex flex-col gap-y-2">
      <div className="flex h-full flex-col items-center gap-y-2">
        <h1 className="flex flex-col text-2xl text-gray-400">
          Available stock
        </h1>
        <div className="flex w-full justify-around">
          {/* <!-- SMALL --> */}
          <div className={h1Styles}>
            {update ? (
              <input
                className={stockInput}
                value={stockSize.small}
                type="number"
                required
                onChange={(e) =>
                  setStockSize({ ...stockSize, small: e.target.value })
                }
              ></input>
            ) : (
              <p>{stockSize.small}</p>
            )}

            <span className="text-base text-gray-400">Small</span>
          </div>

          {/* <!-- MEDIUM --> */}
          <div className={h1Styles}>
            {update ? (
              <input
                className={stockInput}
                value={stockSize.medium}
                type="number"
                required
                onChange={(e) =>
                  setStockSize({ ...stockSize, medium: e.target.value })
                }
              ></input>
            ) : (
              <p>{stockSize.medium}</p>
            )}
            <span className="text-base text-gray-400">Medium</span>
          </div>

          {/* <!-- LARGE --> */}
          <div className={h1Styles}>
            {update ? (
              <input
                className={stockInput}
                value={stockSize.large}
                type="number"
                required
                onChange={(e) =>
                  setStockSize({ ...stockSize, large: e.target.value })
                }
              ></input>
            ) : (
              <p>{stockSize.large}</p>
            )}
            <span className="text-base text-gray-400">Large</span>
          </div>

          {/* <!-- XLARGE --> */}
          <div className={h1Styles}>
            {update ? (
              <input
                className={stockInput}
                value={stockSize.xl}
                type="number"
                required
                onChange={(e) =>
                  setStockSize({ ...stockSize, xl: e.target.value })
                }
              ></input>
            ) : (
              <p>{stockSize.xl}</p>
            )}

            <span className="text-base text-gray-400">Xtra Large</span>
          </div>
        </div>
      </div>

      <h1 className="flex flex-col text-xl text-gray-200">
        <span className="text-base text-gray-400">Stock ID</span>{" "}
        {stock.stock_id}
      </h1>
      <h1 className="flex flex-col text-xl text-gray-200">
        <span className="text-base text-gray-400">Product name</span>{" "}
        {stock.product_name}
      </h1>
      <h1 className="flex flex-col text-xl text-gray-200">
        <span className="text-base text-gray-400">Product price</span>{" "}
        {stock.product_price} PHP
      </h1>
      {error.value && (
        <p className=" mt-2 flex items-center gap-1 text-base text-red-500">
          <BiErrorCircle />
          {error.message}
        </p>
      )}
      {success && (
        <p className="flex items-center gap-1 font-sans text-lg text-lime-500">
          <AiFillCheckCircle />
          Product updated.
        </p>
      )}
      <div className="mt-5 flex justify-end">
        {update ? (
          <button className={buttonClass} onClick={handleSubmit}>
            Save
          </button>
        ) : (
          <button
            className={buttonClass}
            onClick={() => setUpdate((prev: boolean) => !prev)}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

const Stock = () => {
  const [id, setID] = useState<string>("");
  const [stock, setStock] = useState<any>(null);
  const [error, setError] = useState<any>({ value: false, message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id === "")
      return setError({ value: true, message: "Please enter the Product ID" });

    const response = await axios.get(
      `http://localhost:3000/api/admin/getStock?id=${id}`,
      { withCredentials: true }
    );
    const data = await response.data;
    if (data.status === "fail")
      return setError({
        value: true,
        message: "Product with that ID does not exist.",
      });
    setError({ value: false, message: "" });
    setStock(data.stock);
  };

  return (
    <div className="flex h-full w-full flex-col  overflow-hidden">
      <h1 className="text-3xl font-bold tracking-wider">
        Inventory<span className="text-xl">/Stock</span>
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
                onChange={(e) => setID(e.target.value)}
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
            stock === null && "items-center justify-center"
          } flex h-full w-full flex-col px-5`}
        >
          {stock === null ? (
            <EmptyState message="Search a product ID to view it's available stock or replenish the stock." />
          ) : (
            <StockForm stock={stock} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
