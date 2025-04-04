import SideBar from "../components/SideBar";
import Thumbnails from "../components/Thumbnails";
import { useState, useEffect } from "react";

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

interface HomeProps {
  searchResults: VideoItem[];
}

function Home({ searchResults }: HomeProps) {
  const [category, setCategory] = useState<number>(0);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setVideos(searchResults);
    }
  }, [searchResults]);

  return (
    <>
      <div className=" flex flex-col">
        <div className="w-full">
          <SideBar
            setCategory={setCategory}
            category={category}
            setResponse={setVideos}
          />
        </div>
        <div className="p-5">
          <Thumbnails response={videos} />
        </div>
      </div>
    </>
  );
}

export default Home;
