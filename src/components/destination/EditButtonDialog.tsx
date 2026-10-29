"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Destination } from "@/types/destination";
import { ChevronDown, Edit2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

export default function EditDialog({
  destinationData,
}: {
  destinationData: Destination;
}) {

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const res = await fetch(
      `http://localhost:8000/destinations/${destinationData._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const resData = await res.json();
    router.refresh();
  };

  // Input styling matching the UI
  const inputClass =
    "w-full rounded-none border border-zinc-200 bg-zinc-50/80 px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:outline-none transition-colors";

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="inline-flex items-center gap-1.5 rounded-none border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-none hover:bg-zinc-50"
          >
            <Edit2 className="size-3.5" aria-hidden />
            Edit
          </Button>
        }
      />

      {/* Dialog container with height strictly less than screen (max-h-[85vh]) & scrollable content */}
      <DialogContent className="max-h-[85vh] sm:max-w-xl overflow-y-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-xl font-bold tracking-tight text-zinc-900">
            Update Travel Package
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 font-normal">
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          {/* Destination / Package Name (Full width, no label as shown in mockup) */}
          <div>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={destinationData.name}
              placeholder="Bali Paradise"
              className={inputClass}
            />
          </div>

          {/* Row 2: Country & Category (2 columns) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="country"
                className="mb-1.5 block text-xs font-semibold text-zinc-800"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                defaultValue={destinationData.country}
                placeholder="Indonesia"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-xs font-semibold text-zinc-800"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue={destinationData.category}
                  className={`${inputClass} cursor-pointer appearance-none pr-9`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          {/* Row 3: Price (USD) & Duration (2 columns) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-1.5 block text-xs font-semibold text-zinc-800"
              >
                Price (USD)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                defaultValue={destinationData.price}
                placeholder="e.g., 1299"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="mb-1.5 block text-xs font-semibold text-zinc-800"
              >
                Duration
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                required
                defaultValue={destinationData.duration}
                placeholder="e.g., 7 Days/6 Nights"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 4: Departure Date (Full width) */}
          <div>
            <label
              htmlFor="departureDate"
              className="mb-1.5 block text-xs font-semibold text-zinc-800"
            >
              Departure Date
            </label>
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              required
              defaultValue={destinationData.departureDate}
              placeholder="mm/dd/yyyy"
              className={inputClass}
            />
          </div>

          {/* Row 5: Image URL (Full width) */}
          <div>
            <label
              htmlFor="image"
              className="mb-1.5 block text-xs font-semibold text-zinc-800"
            >
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              required
              defaultValue={destinationData.image}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          {/* Row 6: Description (Full width, textarea) */}
          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-xs font-semibold text-zinc-800"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              defaultValue={destinationData.description}
              placeholder="Describe the travel experience..."
              className={inputClass}
            />
          </div>

          {/* Footer Actions: Cancel & Save Changes buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="inline-flex items-center gap-1.5 rounded-none border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-500 shadow-none transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-600 focus:outline-none"
                >
                  <Trash2 className="size-4" aria-hidden />
                  Cancel
                </Button>
              }
            />
            <DialogClose
              render={
                <Button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-none bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-none transition-colors hover:bg-brand/90 focus:outline-none disabled:opacity-70"
                >
                  <Save className="size-4" aria-hidden />
                  Save Changes
                </Button>
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
