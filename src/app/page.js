"use client";

import axios from "axios";
import { useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

async function getData(q) {
  const data = await axios.get(`http://localhost:3000/api/data/${q}`);
  return data.data.data;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [arrLinks, setArrLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      const links = await getData(query);
      console.log(links);
      setArrLinks(links);
      console.log(arrLinks);
      setLoading(false);
    } catch (err) {
      setError(true);
      console.log(err);
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setQuery("");
  };

  return (
    <main className="max-w-[650px] mx-auto mt-[50px] flex flex-col gap-5 items-center">
      <h1 className="font-bold text-4xl bg-gradient-to-r from-purple-700 via-purple-900 to-slate-500 bg-clip-text text-transparent">Link Scraper</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          className="border border-blue-500 p-2"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Enter query..."
          required
        />
        <button className="bg-green-500 text-white p-2 rounded-md">Get</button>
      </form>
      {loading && <ClipLoader />}
      {error && <h3>Something went wrong</h3>}
      {(arrLinks.length !== 0) && (
        <div className="flex flex-col p-4 rounded-md bg-slate-200">
          {arrLinks &&
            arrLinks.map((link, index) => (
              <a
                className="text-blue-900 hover:text-blue-700"
                key={index}
                href={link}
              >
                {link}
              </a>
            ))}
        </div>
      )}
      {(arrLinks.length === 0) && (<h3 className="text-slate-500">Enter Query. You will see the results here...</h3>)}
    </main>
  );
}
