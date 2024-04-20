"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretations {
  $id: string;
  term: string;
  interpretation: string;
}
export default function Home() {
  const [interpretations, setInterpretations] = useState<IInterpretations[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpretations");
        if (!response.ok) {
          throw new Error("Could not get interpretations");
        }
        const data = await response.json();
        setInterpretations(data);
      } catch (error) {
        console.error("Error while fetching  interpretations", error);
        setError("Failed to load interpretations");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterpretations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/interpretations/${id}`, { method: "DELETE" });
      setInterpretations((prevInterpretations) =>
        prevInterpretations?.filter((i) => i.$id !== id)
      );
    } catch {
      console.error("Error Deleting the interpretation");
      setError("Failed to delete interpretation");
    }
  };
  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {/* List Item Design with Buttons */}
      {isLoading ? (
        <p>Loading...</p>
      ) : interpretations?.length > 0 ? (
        <div>
          {interpretations?.map((interpretation) => (
            <div
              key={interpretation.$id}
              className="p-4 my-2 rounded-md border-b leading-8"
            >
              <div className="font-bold">{interpretation.term}</div>
              <div>{interpretation.interpretation}</div>
              <div className="flex gap-4 justify-end mt-4">
                <Link
                  className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                  href={`/edit/${interpretation.$id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                  onClick={() => handleDelete(interpretation.$id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Interpretations found!</p>
      )}
    </div>
  );
}
