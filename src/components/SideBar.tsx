/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home, Gamepad2, Car, Volleyball, Tv, Cpu, FileMusic, Newspaper } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API;

interface NavBarProps {
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  category: number;
  setResponse: React.Dispatch<React.SetStateAction<VideoItem[]>>;
}

interface VideoItem {
  id: string;
  snippet: {
    categoryId: string;
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: { url: string; };
    };
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

function SideBar({ setCategory, category, setResponse }: NavBarProps) {
  const [loading, setLoading] = useState<boolean>(true);

  function handleCategory({item}:any):void{
    setCategory(item.category);
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      );

      setResponse(res.data.items);
      setLoading(false);
    } finally{
      setLoading(false);
    }
  }, [category, setResponse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading videos...</div>;
  }

  return (
    <div className={`flex flex-wrap md:flex-nowrap justify-center items-center p-2 md:p-4 bg-[#1D202A]  min-w-[200px]`}>
      <div className="flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-2">
        {[
          { icon: <Home size={18} />, label: "Home", category: 0 },
          { icon: <Gamepad2 size={18} />, label: "Gaming", category: 20 },
          { icon: <Car size={18} />, label: "Automobiles", category: 2 },
          { icon: <Volleyball size={18} />, label: "Sports", category: 17 },
          { icon: <Tv size={18} />, label: "Entertainment", category: 24 },
          { icon: <Cpu size={18} />, label: "Technology", category: 28 },
          { icon: <FileMusic size={18} />, label: "Music", category: 10 },
          { icon: <Newspaper size={18} />, label: "News", category: 25 },
        ].map((item, index) => (
          <div onClick={() => handleCategory({item})} key={index} className={`flex items-center border border-gray-500 gap-2 p-2 lg:p-2 rounded-4xl cursor-pointer hover:bg-gray-900 transition mx-0.5 w-auto ${category === item.category ? 'bg-gray-800' : ''}`}>
            <span className={"text-dark"}>{item.icon}</span>
            <div className="text-dark text-sm md:text-base hidden lg:block">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
