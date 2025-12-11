'use client';

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { NavigationBarNew } from "@/components/NavigationBarNew";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

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

export default function AdventuresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [interestFilter, setInterestFilter] = useState("");

  const filteredArcs = useMemo(() => {
    return adventureArcs.filter(arc => {
      const query = searchQuery.toLowerCase();
      const title = `Adventure ${String(arc.id).padStart(2, '0')}: ${arc.title}`.toLowerCase();
      
      const matchesSearch = query === "" ||
        title.includes(query) ||
        arc.description.toLowerCase().includes(query);
      
      const matchesFilter = interestFilter === "" || title.includes(interestFilter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, interestFilter]);
  
  const adventureCategories = useMemo(() => {
    const categories = new Set(adventureArcs.map(arc => `Adventure ${String(arc.id).padStart(2, '0')}`));
    return ["", ...Array.from(categories)];
  }, []);

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
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 pl-5 py-3 rounded-full bg-[#1A1F2B] text-white border border-[#FFA64D33] focus:border-[#FFA64D] outline-none"
            />
            <select
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
              className="bg-[#1A1F2B] border border-[#FFA64D33] text-white px-4 py-3 rounded-full appearance-none w-full md:w-auto"
            >
              <option value="">Filter by Arc</option>
              {adventureCategories.slice(1).map(adv => (
                <option key={adv} value={adv}>{adv}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="content-wrapper mb-20 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArcs.map((arc) => (
              <Link href={`/adventure-detail?arcId=${arc.id}`} key={arc.id}>
                <motion.div
                  className="bg-[#1A1F2B] rounded-lg overflow-hidden shadow-lg hover:shadow-[#FFA64D33] transition-all duration-300 cursor-pointer h-full flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-xl text-[#FFA64D] mb-2">
                      Adventure {String(arc.id).padStart(2, '0')}: {arc.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">{arc.description}</p>
                  </div>
                  <div className="p-6 bg-[#151925] mt-auto">
                      <p className="text-sm text-gray-300">{arc.episodes} Episodes</p>
                  </div>
                </motion.div>
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

