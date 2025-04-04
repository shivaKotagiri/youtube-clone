/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";

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
    likeCount?: string;
    commentCount?: string;
  };
  contentDetails: {
    duration: string;
  };
}

interface SearchBarProps {
  setSearchData: (data: VideoItem[]) => void;
}

function SearchBar({ setSearchData }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  async function handleSearch(): Promise<void> {
    if (searchQuery.trim().length === 0 || isSearching) return;

    try {
      setIsSearching(true);
      const API_KEY = import.meta.env.VITE_YOUTUBE_API;
      const searchRes = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`
      );

      if (searchRes.data && searchRes.data.items && searchRes.data.items.length > 0) {
        const videoIds = searchRes.data.items.map((item: any) => item.id.videoId).join(',');
        const videoDetailsRes = await axios.get<{ items: VideoItem[] }>(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
        );

        if (videoDetailsRes.data && videoDetailsRes.data.items) {
          setSearchData(videoDetailsRes.data.items);
        }
      } else {
        setSearchData([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchData([]);
    } finally {
      setIsSearching(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex bg-[#252831] items-center justify-between border border-gray-400 rounded-3xl p-1 w-3/4 max-w-full md:max-w-[450px]">
        <input type="text" placeholder="Search..." className="w-full focus:outline-none p-1.5" value={searchQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress} disabled={isSearching}/>
        <div className={`flex justify-center items-center mx-2 cursor-pointer text-gray-300 ${isSearching ?'opacity-50' : ''}`} onClick={handleSearch}><Search /></div>
      </div>
    </>
  );
}

export default SearchBar;
