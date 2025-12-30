import Swal from "sweetalert2";
import { customSwalConfig } from "./swalConfig";
import upvoteIcon from "./assets/upvote.png";
import downvoteIcon from "./assets/downvote.png";

interface Spot {
  id: number;
  location: string;
  building?: string;
  description?: string;
  comfortRating?: number;
  footTraffic?: number;
  noiseLevel?: number;
  tagLine?: string;
  upvotes?: number;
  downvotes?: number;
}

interface LocationCardProps {
  spot: Spot;
  onVote: (spotId: number, voteType: "upvote" | "downvote") => Promise<void>;
  voteStatus: "upvoted" | "downvoted" | null;
}

export default function LocationCard({ spot, onVote }: LocationCardProps) {
  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(spot.id, "upvote");
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(spot.id, "downvote");
  };

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
      className="bg-white cursor-pointer h-60 rounded-md shadow-md p-6 hover:shadow-xl flex flex-col items-center animate-fade-in"
    >
      <div className="flex-1 flex flex-col gap-3 items-center justify-center">
        <h3 className="text-l xs:text-xl text-[var(--aritzia-blue)]">
          {spot.location} in{" "}
          <span className="text-[var(--bright-orange)]">{spot.building}</span>
        </h3>

        <p className="text-sm xs:text-base text-gray-700">{spot.tagLine}</p>
        <p className="text-xs italic text-gray-400">click me</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleUpvote}
          className="flex items-center gap-1 px-2 py-1 rounded transition-opacity hover:opacity-70 cursor-pointer"
        >
          <img src={upvoteIcon} alt="upvote" className="w-5 h-5" />
          <span className="text-xs font-medium text-gray-700">
            {spot.upvotes || 0}
          </span>
        </button>
        <button
          onClick={handleDownvote}
          className="flex items-center gap-1 px-2 py-1 rounded transition-opacity hover:opacity-70 cursor-pointer"
        >
          <span className="text-xs font-medium text-gray-700">
            {spot.downvotes || 0}
          </span>
          <img src={downvoteIcon} alt="downvote" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
