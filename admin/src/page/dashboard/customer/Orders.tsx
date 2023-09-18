import { useState, FormEvent } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdContentPasteSearch } from "react-icons/md";
import axios from "axios";

const EmptyState = () => {
  return (
    <>
      <MdContentPasteSearch className="text-9xl text-gray-500" />
      <h1 className="text-xl text-gray-500">
        Search a User ID to show his/her orders.
      </h1>
    </>
  );
};

const OrderStatus = ({ props }: { props: { status: string } }) => {
  const { status } = props;
  let statusColor = "";
  switch (status) {
    case "pending":
      statusColor = "text-yellow-400";
      break;
    case "processing":
      statusColor = "text-green-400";
      break;
    case "shipped":
      statusColor = "text-green-500";
      break;
  }

  return (
    <span className={statusColor}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Order = ({ order }: any) => {
  return (
    <div key={order.order_id} className="bg-gray-700 p-2 text-gray-200">
      <p className="text-gray-400">Order ID: {order.order_id}</p>
      <p className="text-gray-400">Tracking ID: {order.tracking_id}</p>
      <p className="text-gray-400">
        Order status: {<OrderStatus props={{ status: order.order_status }} />}
      </p>
      <div className="flex gap-x-2 text-gray-200">
        <p className="text-bold font-semibold">
          <span className="font-normal text-gray-400">Product name:</span>{" "}
          {order.items.product.product_name}
        </p>
        <p className="text-base">({order.items.item_qty} pcs)</p>
      </div>
      <p>
        <span className="text-gray-400">Product size: </span>
        {order.items.item_size.toUpperCase()}
      </p>
      <p>
        <span className="text-gray-400">Order total: </span>
        {order.order_total} PHP
      </p>
    </div>
  );
};

const Orders = () => {
  const [error, setError] = useState<any>({ value: false, message: "" });
  const [orders, setOrders] = useState<any>(null);
  const [id, setID] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id === "")
      return setError({ value: true, message: "Please enter the User ID." });

    axios
      .get(`http://localhost:3000/api/admin/getOrder?id=${id}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        const data = await res.data;
        if (data.status === "fail") {
          setOrders(null);
          return setError({
            value: true,
            message: "User with that ID does not exist.",
          });
        }
        setError({
          value: false,
          message: "",
        });
        return setOrders(data.orders);
      });
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <h1 className="text-3xl font-bold tracking-wider">
        Customers<span className="text-xl">/Order</span>
      </h1>

      <div
        className="my-5 flex h-full w-full flex-col overflow-y-auto bg-gray-800 
        p-5 text-gray-200 shadow-xl scrollbar-thin scrollbar-thumb-gray-600"
      >
        <form
          className="flex w-full flex-col px-5"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="flex w-full items-end gap-5 ">
            <div className="flex w-full flex-col">
              <label htmlFor="search-id" className="text-base font-medium">
                Search User ID
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
            orders === null && "items-center justify-center"
          } flex h-full w-full flex-col gap-y-5  px-5`}
        >
          {orders === null ? (
            <EmptyState />
          ) : (
            orders.map((order: any) => <Order order={order} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
