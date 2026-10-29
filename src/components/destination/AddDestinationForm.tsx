"use client";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Options for the Category dropdown.
const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const AddDestinationForm = () => {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const res = await fetch("http://localhost:8000/destinations",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log("from server",resData);
    router.refresh()
  };

  // Shared class string so every input looks the same.
  const inputClass =
    "w-full border border-zinc-200 bg-zinc-100 px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-brand focus:bg-white focus:outline-none";

  return (
    <div className=" p-20 mt-20">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-20 w-full max-w-4xl mx-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Destination Name — full width */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Destination Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Bali Paradise"
              className={inputClass}
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              placeholder="Indonesia"
              className={inputClass}
            />
          </div>

          {/* Category — dropdown */}
          <div>
            <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className={inputClass}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Price (US$)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              required
              placeholder="e.g., 1299"
              className={inputClass}
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              required
              placeholder="e.g., 7 Days/6 Nights"
              className={inputClass}
            />
          </div>

          {/* Departure Date — full width */}
          <div className="sm:col-span-2">
            <label htmlFor="departureDate" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Departure Date
            </label>
            <input
              id="departureDate"
              name="departureDate"
              type="date"
              required
              className={inputClass}
            />
          </div>

          {/* Image URL — full width */}
          <div className="sm:col-span-2">
            <label htmlFor="image" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          {/* Description — textarea */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-zinc-800">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              placeholder="Describe the travel experience..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Buttons — right aligned */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="reset"
            className="inline-flex items-center gap-2 border border-red-300 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <X className="size-4" aria-hidden />
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            <Save className="size-4" aria-hidden />
            Add Travel Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinationForm;