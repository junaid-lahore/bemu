import React from "react";
import Link from "next/link";
import { NavigationBarNew } from "@/components/NavigationBarNew";
import { Footer } from "@/components/Footer";

const adventureArcs = [
  {
    id: 1,
    title: "Beamu Meets the Family",
    episodes: 6,
    description: "Join Beamu on a heartwarming journey of meeting the family for the first time."
  },
  {
    id: 2,
    title: "The Lost Signal",
    episodes: 4,
    description: "A mysterious signal leads Beamu and Leo on a quest to uncover a hidden secret."
  },
];

export default function AdventuresPage({ searchParams }: { searchParams: { q?: string; arc?: string } }) {
  const query = (searchParams.q || "").toLowerCase();
  const arcFilter = (searchParams.arc || "").toLowerCase();

  const filteredArcs = adventureArcs.filter(arc => {
    const titleFull = `Adventure ${String(arc.id).padStart(2, '0')}: ${arc.title}`.toLowerCase();
    const matchesSearch =
      query === "" ||
      titleFull.includes(query) ||
      arc.description.toLowerCase().includes(query);
    const matchesFilter =
      arcFilter === "" || titleFull.includes(arcFilter);
    return matchesSearch && matchesFilter;
  });

  const adventureCategories = Array.from(new Set(adventureArcs.map(arc => `Adventure ${String(arc.id).padStart(2, '0')}`)));

  return (
    <div className="flex flex-col min-h-screen bg-[#0C1021] text-white">
      <NavigationBarNew />
      <header className="text-center py-20 bg-gradient-to-b from-[#0C1021] to-[#181C28]">
        <div className="content-wrapper">
          <h1 className="text-5xl font-bold text-[#FFA64D] mb-3">Adventure Arcs</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose an adventure arc and follow Leo and Beamu on their epic journeys.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        <section className="my-10">
          <div className="content-wrapper flex flex-col md:flex-row justify-center items-center gap-4 px-4">
            <form method="get" action="/adventures" className="w-full md:w-1/2">
              <input
                type="text"
                name="q"
                defaultValue={searchParams.q || ""}
                placeholder="Search by title or description..."
                className="w-full pl-5 py-3 rounded-full bg-[#1A1F2B] text-white border border-[#FFA64D33] focus:border-[#FFA64D] outline-none"
              />
            </form>
            <div className="flex gap-2 flex-wrap justify-center">
              <Link href="/adventures" className={`px-4 py-2 rounded-full border border-[#FFA64D33] ${arcFilter === "" ? "bg-[#FFA64D22] text-[#FFA64D]" : "text-white"}`}>
                All
              </Link>
              {adventureCategories.map(adv => (
                <Link
                  key={adv}
                  href={`/adventures?arc=${encodeURIComponent(adv)}`}
                  className={`px-4 py-2 rounded-full border border-[#FFA64D33] ${arcFilter === adv.toLowerCase() ? "bg-[#FFA64D22] text-[#FFA64D]" : "text-white"}`}
                >
                  {adv}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-wrapper mb-20 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArcs.map((arc) => (
              <Link href={`/adventure-detail?arcId=${arc.id}`} key={arc.id}>
                <div className="bg-[#1A1F2B] rounded-lg overflow-hidden shadow-lg hover:shadow-[#FFA64D33] transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-xl text-[#FFA64D] mb-2">
                      Adventure {String(arc.id).padStart(2, '0')}: {arc.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">{arc.description}</p>
                  </div>
                  <div className="p-6 bg-[#151925] mt-auto">
                      <p className="text-sm text-gray-300">{arc.episodes} Episodes</p>
                  </div>
                </div>
              </Link>
            ))}
            {filteredArcs.length === 0 && (
              <p className="col-span-full text-center">No adventure arcs found.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


