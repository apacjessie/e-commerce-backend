import { FormEvent, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/customHooks";
import { StoreAction } from "../context/StoreContext";

const LoginForm = () => {
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<{ value: boolean; message: string }>();
  const { dispatch } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.username.trim() === "" || form.password.trim() === "")
      return setError({
        value: true,
        message: "Please enter your username and/or password",
      });
    setError({
      value: false,
      message: "",
    });
    dispatch({ type: StoreAction.GET_USER, payload: { username: "jessie" } });
    return navigate("/dashboard");
  };

  return (
    <form
      className="flex flex-col justify-center gap-5"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="username"
          className="text-l text-gray-800 dark:text-gray-100"
        >
          Username
        </label>
        <input
          className="rounded-sm border-none bg-neutral-200 p-2 text-xl text-gray-950
                   outline-none outline-offset-2 focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200"
          type="text"
          id="username"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        ></input>
      </div>
      <div className="flex flex-col gap-1 ">
        <label
          htmlFor="password"
          className="text-l text-gray-800 dark:text-gray-100"
        >
          Password
        </label>
        <input
          className="rounded-sm border-none bg-neutral-200 p-2 text-xl text-gray-950
                 outline-none outline-offset-2 focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200"
          type="password"
          id="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        ></input>
      </div>
      {error?.value && (
        <p className="text-md flex items-center gap-1 font-sans text-red-500">
          <BiErrorCircle />
          {error?.message}
        </p>
      )}

      <button
        className="mt-2 w-fit bg-blue-700 px-10 py-1 font-sans 
              text-xl font-bold uppercase transition-all duration-100 active:bg-blue-600 "
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
