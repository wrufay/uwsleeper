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

interface LocationCardProps {
  spot: Spot;
}

export default function LocationCard({ spot }: LocationCardProps) {
  const showFullDescription = () => {
    Swal.fire({
      ...customSwalConfig,
      title: `${spot.location} in ${spot.building}`,
      html: `
        <div class="text-left space-y-4">
          <div class="space-y-2 mt-8">
            ${
              spot.comfortRating !== undefined
                ? `
              <div class="flex items-center justify-around">
                <span class="text-sm text-gray-700">Comfort</span>
                <div class="flex items-center gap-1">
                  ${"★"
                    .repeat(spot.comfortRating)
                    .split("")
                    .map(
                      () => '<span class="text-[var(--goose-yellow)]">★</span>'
                    )
                    .join("")}
                  ${"★"
                    .repeat(5 - spot.comfortRating)
                    .split("")
                    .map(() => '<span class="text-gray-300">★</span>')
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            ${
              spot.noiseLevel !== undefined
                ? `
              <div class="flex items-center justify-around">
                <span class="text-sm text-gray-700">Loudness</span>
                <div class="flex items-center gap-1">
                  ${"★"
                    .repeat(spot.noiseLevel)
                    .split("")
                    .map(() => '<span class="text-red-400">★</span>')
                    .join("")}
                  ${"★"
                    .repeat(5 - spot.noiseLevel)
                    .split("")
                    .map(() => '<span class="text-gray-300">★</span>')
                    .join("")}
                </div>
              </div>
            `
                : ""
            }

            ${
              spot.footTraffic !== undefined
                ? `
              <div class="flex items-center justify-around">
                <span class="text-sm text-gray-700">Busyness</span>
                <div class="flex items-center gap-1">
                  ${"★"
                    .repeat(spot.footTraffic)
                    .split("")
                    .map(() => '<span class="text-blue-400">★</span>')
                    .join("")}
                  ${"★"
                    .repeat(5 - spot.footTraffic)
                    .split("")
                    .map(() => '<span class="text-gray-300">★</span>')
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>

          ${
            spot.description
              ? `
              <p class="text-sm text-gray-700 mt-6 p-2 leading-relaxed">${spot.description}</p>`
              : ""
          }
        </div>
      `,
      confirmButtonText: "Close",
      showCancelButton: false,
    });
  };

  // card itself
  return (
    <div
      onClick={showFullDescription}
      className="bg-white cursor-pointer h-60 rounded-md shadow-md p-8 hover:shadow-xl flex flex-col gap-4 sm:gap-8 items-center"
    >
      <h3 className="text-xl font-bold text-[var(--aritzia-blue)]">
        {spot.location} in{" "}
        <span className="text-[var(--bright-orange)]">{spot.building}</span>
      </h3>

      <p className="text-base text-gray-700">{spot.tagLine}</p>
      <p className="text-xs italic text-gray-400">click me</p>
    </div>
  );
}
