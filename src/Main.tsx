import cloudImage from "./assets/cloud.png";
import arrowImage from "./assets/arrow.png";

export default function Main() {
  return (
    <main className="animate-fade-in">
      <section className="flex flex-col items-center min-h-screen justify-center">
        <div className="relative">
          <img
            src={cloudImage}
            alt="Cloud"
            className="w-50 h-50 sm:w-70 sm:h-70 animate-float"
          ></img>
          <h1 className="uppercase shizuru-regular text-white text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 sm:-translate-y-1/8 sm:text-7xl">
            UW Sleeper
          </h1>
        </div>
        {/* selector buttons and inputs here*/}
        <div className="mt-6 sm:mt-8 flex flex-col gap-5 items-center">
          <button
            id="randomizeBtn"
            className="w-35 hover:cursor-pointer bg-linear-to-r hover:bg-linear-to-l to-[var(--bright-orange)] from-[var(--goose-yellow)]  text-[var(--aritzia-blue)] rounded-full px-4 py-2"
          >
            Randomize
          </button>
          <span className="text-white text-sm sm:text-lg">or</span>

          <div className="flex justify-center w-full relative">
            <textarea
              id="searchInput"
              rows={3}
              className="bg-white text-[var(--dark)] px-4 py-2 rounded-lg focus:outline-none hover:bg-gray-100 w-60 sm:w-96 resize-none shadow-[-3px_6px_8px_rgba(0,0,0,0.15)]"
              placeholder="Describe your ideal nap spot..."
            ></textarea>
            <button
              id="searchBtn"
              className="bg-linear-to-r from-[var(--bright-orange)] to-[var(--goose-yellow)] w-13 h-13 rounded-full cursor-pointer absolute right-0 translate-x-2 translate-y-12 sm:translate-x-3 sm:translate-y-10 sm:w-16 sm:h-16 shadow-[-3px_6px_8px_rgba(0,0,0,0.15)] flex items-center justify-center"
            >
              <img
                src={arrowImage}
                alt="Arrow"
                className="w-8 h-8 sm:w-10 sm:h-10 hover:w-10 hover:h-10 sm:hover:w-12 sm:hover:h-12"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
