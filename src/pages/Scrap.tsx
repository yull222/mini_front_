import { useState, type JSXElementConstructor } from "react";

type newsHistory = {
  title: string;
  originallink: string;
  link: string;
  summary: string;
};

export default function Scrap() {
  const [news, setNews] = useState();
  const historyRetrieve = async (): Promise<void> => {
    const resp:Response = await fetch("server.com/history", {
      method: "POST",
      headers : { "Content-Type": "application/json" },
    });
    const jsn:JSON= await resp.json();
    setNews(jsn.items);
  };
  return <div>Scrap</div>;
}
