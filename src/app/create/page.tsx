"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill all the fields");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpretations", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error to create interpretation");
      }
      router.push('/')
    } catch (error) {
      console.log("Error in submitting");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Create New Item</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          value={formData.term}
          onChange={handleInputChange}
          placeholder="Term"
          className="py-1 px-4 border rounded-md ring-1"
        />

        <textarea
          name="interpretation"
          rows={4}
          placeholder="Description"
          value={formData.interpretation}
          onChange={handleInputChange}
          className="border ring-1 rounded-md py-1 px-4 resize-none"
        ></textarea>

        <button
          className="bg-black text-white mt-5 cursor-pointer rounded-md py-1 px-4"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
