import hero from "../assets/cover.jpg";

const ImageHero = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-right"
      style={{ backgroundImage: `url(${hero})` }}
    ></div>
  );
};

export default ImageHero;
