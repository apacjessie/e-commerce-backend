import { ChangeEvent, FormEvent, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import Select from "react-select";
import {
  inputClass,
  customStyles,
  SelectTheme,
  buttonClass,
} from "../../../styles/Styles";
import axios from "axios";

const category = [
  { label: "Tshirts", value: "tshirts" },
  { label: "Shirts", value: "shirts" },
  { label: "Sweaters", value: "sweaters" },
  { label: "Jackets", value: "jackets" },
];

const gender = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
];

const Add = () => {
  const [error, setError] = useState<any>({ error: false, message: "" });
  const [success, setSuccess] = useState<any>(false);
  const [form, setForm] = useState<any>({
    name: "",
    category: "",
    gender: "",
    price: 0,
  });
  const [image, setImage] = useState<any>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setError({ value: false, message: "" });
      return setImage(file);
    }
  };

  const isValidate = () => {
    if (form.category === "" || form.gender === "") {
      if (form.name === "" || form.price === "" || form.price === 0) {
        return false;
      }
    }
    return true;
  };

  const isFileValid = () => {
    if (image.name === undefined) return true;
    const extension = image.name.split(".").pop()?.toLowerCase();
    if (extension !== "jpg" && extension !== "png") {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!isValidate())
      return setError({ value: true, message: "Please fill up all input." });

    if (!isFileValid())
      return setError({ value: true, message: "Invalid file type" });

    if (!image)
      return setError({ value: true, message: "Product image are required!" });

    setError({ value: false, message: "" });
    setSuccess(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("gender", form.gender);
    formData.append("price", form.price);
    axios.post("http://localhost:3000/api/admin/add", formData);
  };

  return (
    <div className="flex h-full w-full flex-col  overflow-hidden">
      <h1 className="text-3xl font-bold tracking-wider">
        Inventory<span className="text-xl">/Add</span>
      </h1>
      <form
        className="my-5 flex h-full w-full flex-col gap-y-3 bg-gray-800 p-5 px-10 
                     text-gray-200 shadow-xl"
        onSubmit={handleSubmit}
        noValidate
      >
        <label htmlFor="prod-name" className="text-lg font-medium">
          Product name
          <input
            id="prod-name"
            className={inputClass}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label htmlFor="prod-categ" className="text-lg font-medium">
          Product Category
          <Select
            isSearchable={false}
            options={category}
            styles={customStyles}
            theme={SelectTheme}
            id="prod-categ"
            onChange={(selected: any) =>
              setForm({ ...form, category: selected.value })
            }
          />
        </label>

        <label htmlFor="prod-gender" className="text-lg font-medium">
          Product Gender Category
          <Select
            isSearchable={false}
            options={gender}
            styles={customStyles}
            theme={SelectTheme}
            id="prod-gender"
            onChange={(selected: any) =>
              setForm({ ...form, gender: selected.value })
            }
          />
        </label>

        <label htmlFor="prod-price" className="text-lg font-medium">
          Product Price
          <input
            id="prod-price"
            className={inputClass}
            type="number"
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>

        <label className="text-lg font-medium" htmlFor="file_input">
          Product Image
          <input
            className="w-full rounded-sm bg-gray-700 p-1 text-lg text-gray-200 placeholder-slate-700 file:mr-2
                      file:border-none file:bg-gray-600 file:px-3 file:text-gray-200 file:hover:cursor-pointer file:hover:bg-gray-500 file:hover:duration-200"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={handleFileChange}
          ></input>
          <p
            className="mt-1 font-sans text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG.
          </p>
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
            Product added.
          </p>
        )}
        <button className={buttonClass}>Submit</button>
      </form>
    </div>
  );
};

export default Add;
