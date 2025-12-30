import cloudImage from "./assets/cloud.png";
import arrowImage from "./assets/arrow.png";
import { swalVariants } from "./swalConfig";

interface Spot {
  location: string;
  building?: string;
  description?: string;

  comfortRating?: number;
  footTraffic?: number;
  noiseLevel?: number;

  tagLine?: string;
}

export default function Main() {
  // setup swal output design
  const showLocationSwal = (spot: Spot) => {
    const title = `${spot.location} in ${spot.building}`;
    const description = `
    ${spot.tagLine}


    ${spot.comfortRating}/5 comfort

    ${spot.noiseLevel}/5 noise level

    ${spot.footTraffic}/5 typical busyness`;

    swalVariants.success(title.toUpperCase(), description);
  };

  // get random (easiest, no error catching b/c just fetching from simple endpoint)
  const displayRandom = async () => {
    const response = await fetch(
      "https://uwsleeperbackend-production.up.railway.app/api/spots/random"
    );
    const spot: Spot = await response.json();
    showLocationSwal(spot);
  };

  const displaySearchResult = async () => {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLTextAreaElement;
    const userQuery = searchInput?.value.trim();
    if (!userQuery) return;
    swalVariants.loading("Be patient ☺︎", "Finding the best spot for you...");
    try {
      const spot = await searchSpots(userQuery);
      showLocationSwal(spot);
    } catch (error) {
      swalVariants.error(
        "Sorry, search failed.",
        "Could not find a matching spot, please try again!"
      );
    }
  };

  const searchSpots = async (input: string): Promise<Spot> => {
    const response = await fetch(
      "https://uwsleeperbackend-production.up.railway.app/api/spots/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: input,
        }),
      }
    );

    const spot: Spot = await response.json();
    return spot;
  };

  return (
    <main className="animate-fade-in flex-grow mb-10 sm:mb-0">
      <section className="flex flex-col items-center mt-16 sm:mt-18 lg:mt-22 xl:mt-30">
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
        <div className="mt-6 sm:mt-8 flex flex-col gap-6 items-center">
          <button
            id="randomizeBtn"
            onClick={displayRandom}
            className="w-35 hover:cursor-pointer bg-linear-to-r from-[var(--goose-yellow)] to-[var(--bright-orange)] text-[var(--aritzia-blue)] rounded-full px-4 py-2 hover:scale-105"
          >
            Randomize
          </button>
          <span className="text-white text-sm sm:text-lg">
            or describe what you need rn...
          </span>

          {/* textarea and search button here*/}
          <div className="flex justify-center w-full relative">
            <textarea
              id="searchInput"
              rows={3}
              className="bg-white text-sm sm:text-base text-[var(--dark)] px-4 py-4 text-center rounded-lg focus:outline-none hover:bg-gray-100 w-60 sm:w-96 resize-none shadow-[-3px_6px_8px_rgba(0,0,0,0.15)]"
              placeholder="i woke up at 4am and need somewhere comfy to nap before my math137 exam in PAC"
            ></textarea>
            <button
              id="searchBtn"
              onClick={displaySearchResult}
              className=" bg-[var(--goose-yellow)] w-13 h-13 rounded-full cursor-pointer absolute right-0 translate-x-2 translate-y-15 sm:translate-x-3 sm:translate-y-14 sm:w-16 sm:h-16 shadow-[-3px_6px_8px_rgba(0,0,0,0.15)] hover:scale-105 flex items-center justify-center"
            >
              <img
                src={arrowImage}
                alt="Arrow"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
