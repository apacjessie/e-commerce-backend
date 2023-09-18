import { FormEvent, useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import Select from "react-select";
import axios from "axios";
import {
  inputClass,
  SelectTheme,
  customStyles,
  buttonClass,
} from "../../../styles/Styles";
import EmptyState from "../../../components/EmptyState";

const ProductForm = ({ product, setProduct }: any) => {
  const [form, setForm] = useState<any>({
    gender: "",
    category: "",
    name: "",
    price: 0,
  });
  const [error, setError] = useState<any>({ error: false, message: "" });
  const [success, setSuccess] = useState<any>(false);

  const category = [
    { label: "Tshirts", value: "tshirts" },
    { label: "Shirts", value: "shirts" },
    { label: "Sweaters", value: "sweaters" },
    { label: "Jackets", value: "jackets" },
    { label: "Dress", value: "dress" },
  ];

  const gender = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
  ];

  const defaultCategory = category.filter(
    (c) => c.value === product.category
  )[0];
  const defaultGender = gender.filter((g) => g.value === product.gender)[0];
  useEffect(() => {
    setForm({
      ...form,
      gender: defaultGender,
      category: defaultCategory,
      name: product.name,
      price: product.price,
    });
  }, [product]);

  const isChanging = () => {
    if (
      form.gender.value === product.gender &&
      form.category.value === product.category
    ) {
      if (form.name === product.name && form.price === product.price)
        return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!isChanging())
      return setError({ value: true, message: "Nothing changed." });
    if (
      form.category.value === "" ||
      form.gender.value === "" ||
      form.name === "" ||
      form.price === "" ||
      form.price === 0
    )
      return setError({
        value: true,
        message: "Please fill up all the input.",
      });
    setError({ value: false, message: "" });
    const data = {
      id: product.id,
      name: form.name,
      category: form.category.value,
      gender: form.gender.value,
      price: parseFloat(form.price),
    };
    const response = await axios.post(
      "http://localhost:3000/api/admin/modify",
      data,
      { withCredentials: true }
    );
    const res = await response.data;
    if (res.status === "success") return setSuccess(true);
  };

  return (
    <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
      <label htmlFor="prod-name" className="text-lg font-medium">
        Product name
        <input
          value={form.name}
          id="prod-name"
          className={inputClass}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>

      <label htmlFor="prod-categ" className="text-lg font-medium">
        Product Category
        <Select
          defaultValue={defaultCategory}
          value={form.category}
          isSearchable={false}
          options={category}
          styles={customStyles}
          theme={SelectTheme}
          id="prod-categ"
          onChange={(selected: any) => setForm({ ...form, category: selected })}
        />
      </label>

      <label htmlFor="prod-gender" className="text-lg font-medium">
        Product Gender Category
        <Select
          defaultValue={defaultGender}
          value={form.gender}
          isSearchable={false}
          options={gender}
          styles={customStyles}
          theme={SelectTheme}
          id="prod-gender"
          onChange={(selected: any) => setForm({ ...form, gender: selected })}
        />
      </label>

      <label htmlFor="prod-price" className="text-lg font-medium">
        Product Price
        <input
          value={form.price}
          id="prod-price"
          className={inputClass}
          type="number"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </label>
      {error.value && (
        <p className="flex items-center gap-1 font-sans text-lg text-red-500">
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
      <div className="mt-2 flex w-full justify-end gap-x-5">
        <button className={buttonClass}>Save</button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setProduct(null)}
        >
          Close
        </button>
      </div>
    </form>
  );
};

const Modify = () => {
  const [product, setProduct] = useState<any>(null);
  const [id, setID] = useState<any>("");
  const [error, setError] = useState<{ value: boolean; message: string }>({
    value: false,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id === "")
      return setError({ value: true, message: "Please enter the Product ID." });

    axios
      .get(`http://localhost:3000/api/getProduct/${id}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        const data = await res.data;
        if (data.status === "fail") {
          setProduct(null);
          return setError({
            value: true,
            message: "Product with that ID does not exist.",
          });
        }
        setError({
          value: false,
          message: "",
        });
        return setProduct(data);
      });
  };

  return (
    <div className="flex h-full w-full flex-col  overflow-hidden">
      <h1 className="text-3xl font-bold tracking-wider">
        Inventory<span className="text-xl">/Modify</span>
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
            product === null && "items-center justify-center"
          } flex h-full w-full flex-col px-5`}
        >
          {product === null ? (
            <EmptyState message="Search a Product ID to modify." />
          ) : (
            <ProductForm product={product} setProduct={setProduct} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modify;
