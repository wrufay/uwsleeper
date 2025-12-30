export default function Contribute() {
  return (
    <main className="flex items-center flex-col pt-40 animate-fade-in">
      <h1 className="text-white text-4xl shizuru-regular uppercase mb-8">
        Add a location
      </h1>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 w-90">
          <label
            htmlFor="buildingInput"
            className="text-left uppercase text-[var(--goose-yellow)] px-3"
          >
            Building
          </label>
          <input
            id="buildingInput"
            className="bg-white text-[var(--dark)] p-3 rounded-lg focus:outline-none hover:bg-gray-100 w-full"
            placeholder="eg. DC Library"
          />
        </div>
        <div className="flex flex-col gap-2 w-90">
          <label
            htmlFor="locationInput"
            className="text-left uppercase text-[var(--goose-yellow)] px-3"
          >
            Specific location
          </label>
          <input
            id="locationInput"
            className="bg-white text-[var(--dark)] p-3 rounded-lg focus:outline-none hover:bg-gray-100 w-full"
            placeholder="eg. 2nd floor silent study"
          />
        </div>
        <div className="flex flex-col gap-2 w-90">
          <label
            htmlFor="locationInput"
            className="text-left uppercase text-[var(--goose-yellow)] px-3"
          >
            Description
          </label>
          <input
            id="locationInput"
            className="bg-white text-[var(--dark)] p-3 rounded-lg focus:outline-none hover:bg-gray-100 w-full"
            placeholder="Detailed description of the sleeping spot"
          />
        </div>
        <button
          id="submitAddLocationBtn"
          className="mt-4 hover:scale-105 cursor-pointer bg-linear-to-r from-[var(--goose-yellow)] to-[var(--bright-orange)] w-30 mx-auto p-2 rounded-full text-[var(--aritzia-blue)]"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
