import { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import Swal from "sweetalert2";
import { customSwalConfig } from "./swalConfig";

interface Spot {
  id: number;
  location: string;
  building?: string;
  description?: string;
  comfortRating?: number;
  footTraffic?: number;
  noiseLevel?: number;
  tagLine?: string;
}

export default function Browse() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const spotsPerPage = 4;

  // Filter states
  const [buildingFilter, setBuildingFilter] = useState("");
  const [minComfort, setMinComfort] = useState(0);
  const [maxNoise, setMaxNoise] = useState(5);
  const [maxBusyness, setMaxBusyness] = useState(5);

  useEffect(() => {
    fetchAllSpots();
  }, []);

  const fetchAllSpots = async () => {
    try {
      const response = await fetch(
        "https://uwsleeperbackend-production.up.railway.app/api/spots"
      );
      const data = await response.json();
      setSpots(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch spots:", error);
      setLoading(false);
    }
  };

  // Apply filters
  const filteredSpots = spots.filter((spot) => {
    if (buildingFilter && spot.building !== buildingFilter) return false;
    if (spot.comfortRating !== undefined && spot.comfortRating < minComfort)
      return false;
    if (spot.noiseLevel !== undefined && spot.noiseLevel > maxNoise)
      return false;
    if (spot.footTraffic !== undefined && spot.footTraffic > maxBusyness)
      return false;
    return true;
  });

  // Pagination
  const indexOfLastSpot = currentPage * spotsPerPage;
  const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;
  const currentSpots = filteredSpots.slice(indexOfFirstSpot, indexOfLastSpot);
  const totalPages = Math.ceil(filteredSpots.length / spotsPerPage);

  // Get unique buildings for filter
  const uniqueBuildings = Array.from(
    new Set(spots.map((spot) => spot.building).filter(Boolean))
  );

  const showFilterModal = () => {
    Swal.fire({
      ...customSwalConfig,
      title: "Filters",
      html: `
        <div class="text-left">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Building</label>
            <select id="swal-building-filter" class="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-100">
              <option value="">All</option>
              ${uniqueBuildings
                .map(
                  (building) =>
                    `<option value="${building}" ${
                      buildingFilter === building ? "selected" : ""
                    }>${building}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">min comfort: <span id="comfort-value">${minComfort}</span>/5</label>
            <input type="range" id="swal-comfort" min="0" max="5" value="${minComfort}" class="w-full cursor-pointer" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">max volume: <span id="noise-value">${maxNoise}</span>/5</label>
            <input type="range" id="swal-noise" min="0" max="5" value="${maxNoise}" class="w-full cursor-pointer" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">max traction: <span id="busyness-value">${maxBusyness}</span>/5</label>
            <input type="range" id="swal-busyness" min="0" max="5" value="${maxBusyness}" class="w-full cursor-pointer" />
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Apply Filters",
      cancelButtonText: "Reset",
      didOpen: () => {
        const comfortSlider = document.getElementById(
          "swal-comfort"
        ) as HTMLInputElement;
        const noiseSlider = document.getElementById(
          "swal-noise"
        ) as HTMLInputElement;
        const busynessSlider = document.getElementById(
          "swal-busyness"
        ) as HTMLInputElement;

        comfortSlider?.addEventListener("input", (e) => {
          const value = (e.target as HTMLInputElement).value;
          const display = document.getElementById("comfort-value");
          if (display) display.textContent = value;
        });

        noiseSlider?.addEventListener("input", (e) => {
          const value = (e.target as HTMLInputElement).value;
          const display = document.getElementById("noise-value");
          if (display) display.textContent = value;
        });

        busynessSlider?.addEventListener("input", (e) => {
          const value = (e.target as HTMLInputElement).value;
          const display = document.getElementById("busyness-value");
          if (display) display.textContent = value;
        });
      },
      preConfirm: () => {
        const building = (
          document.getElementById("swal-building-filter") as HTMLSelectElement
        ).value;
        const comfort = Number(
          (document.getElementById("swal-comfort") as HTMLInputElement).value
        );
        const noise = Number(
          (document.getElementById("swal-noise") as HTMLInputElement).value
        );
        const busyness = Number(
          (document.getElementById("swal-busyness") as HTMLInputElement).value
        );

        return { building, comfort, noise, busyness };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        setBuildingFilter(result.value.building);
        setMinComfort(result.value.comfort);
        setMaxNoise(result.value.noise);
        setMaxBusyness(result.value.busyness);
        setCurrentPage(1);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setBuildingFilter("");
        setMinComfort(0);
        setMaxNoise(5);
        setMaxBusyness(5);
        setCurrentPage(1);
      }
    });
  };

  return (
    <div className="flex items-center animate-fade-in justify-center flex-grow sm:mt-0 mt-8">
      <main className="max-w-4xl w-full sm:p-6 p-0 lg:p-8">
        <div className="mb-6 lg:mb-10">
          {/* filters button */}
          <button
            onClick={showFilterModal}
            className="bg-gradient-to-l from-[var(--goose-yellow)] to-[var(--bright-orange)] cursor-pointer text-[var(--aritzia-blue)] px-4 py-2 rounded-full hover:scale-105"
          >
            Filters
          </button>
        </div>

        {/* cards */}

        {loading ? (
          <></>
        ) : (
          <>
            {/* grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 mb-10">
              {currentSpots.map((spot) => (
                <LocationCard key={spot.id} spot={spot} />
              ))}
            </div>

            {/* page navigator */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-none text-white text-sm sm:text-lg border border-white/67 rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  Prev
                </button>

                <span className="text-white text-xs sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-none text-white rounded-lg text-sm sm:text-lg border border-white/67 text-lg  hover:bg-white/20 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}

            {currentSpots.length === 0 && (
              <div className="text-center text-white mt-8">
                there's nothing here, try another filter. ⊹ ࣪ ˖
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
