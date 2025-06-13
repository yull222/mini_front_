import { useEffect, useState } from "react";

type fav = {
  items: {
    title: string;
    link: string;
    summary: string;
    pubDate: string;
  }[]
};

export default function Scrap() {
  const [news, setNews] = useState<fav>();
  const historyRetrieve = async (): Promise<void> => {
    try {
      const resp: Response = await fetch("http://localhost:3000/items", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsn = await resp.json();
      // console.log(jsn);
      setNews(jsn);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    historyRetrieve();
  }, []);
  const tags = news
    ? news.map((item) => (
        <div className="bg-white shadow-md rounded-lg p-4 m-2 hover:scale-105 transition-transform duration-200" key={item.link}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2">
              {item.title
                .replace(/<b>/g, "")
                .replace(/<\/b>/g, "")
                .replace(/&quot;/g, '"')}
            </h2>
            <p className="text-sm text-gray-500">{item.pubDate}</p>
          </a>
        </div>
      ))
    : "";
  return <>{tags}</>;
}
