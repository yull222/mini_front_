import { useState } from "react";

type newsHistory = {
  title: string;
  originallink: string;
  link: string;
  summary: string;
  pubDate: string;
};

export default function Scrap() {
  const [news, setNews] = useState({});
  const historyRetrieve = async (): Promise<void> => {
    const resp: Response = await fetch("server.com/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const jsn = await resp.json();
    setNews(jsn.itmes);
  };
  if (news == {}){
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 hover:scale-105 transition-transform duration-200">
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2">
          {news.title
            .replace(/<b>/g, "")
            .replace(/<\/b>/g, "")
            .replace(/&quot;/g, '"')}
        </h2>
        <p className="text-sm text-gray-500">{news.pubDate}</p>
      </a>
    </div>
  );}
}
