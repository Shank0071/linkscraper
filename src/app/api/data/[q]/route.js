import { load } from "cheerio";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
  const { q } = params
  async function getData() {
    const { data } = await axios.get(
      `https://www.bing.com/search?q=${q}`
    );
    const $ = load(data);
    const links = [];
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href && href.startsWith("https")) {
        links.push(href);
      }
    });

    return links;
  }
  const data = await getData();
  return NextResponse.json({data}, { status: 201 });
};
