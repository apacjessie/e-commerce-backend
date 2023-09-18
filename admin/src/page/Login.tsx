import ImageHero from "../components/ImageHero";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <LoginSidebar />
      <ImageHero />
    </>
  );
};

const LoginSidebar = () => {
  return (
    <div
      className={`relative top-0 grid h-screen w-[36rem] 
                 grid-rows-[min-content_minmax(0,1fr)]
                 gap-5 bg-gray-100 px-10
                 py-10 text-white shadow-lg 
                 duration-500 dark:bg-gray-800`}
    >
      <h1 className="font-sans text-5xl font-bold text-gray-800 dark:text-white">
        EXCLSV<span className="font-sans text-xl uppercase">admin</span>
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;
