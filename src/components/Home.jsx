import GalaxyBackground from "./GalaxyBackground";

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden text-white">

      <GalaxyBackground />

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-10">

        <h1 className="text-5xl font-bold">
          Welcome to Raiyan's Galaxy 🚀
        </h1>

        <div className="flex gap-8">
          <button className="bg-red-500 px-8 py-4 rounded-xl text-xl">
            AI Search
          </button>

          <button className="bg-green-500 px-8 py-4 rounded-xl text-xl">
            Talking Tom
          </button>
        </div>

      </div>

    </div>
  );
};

export default Home;