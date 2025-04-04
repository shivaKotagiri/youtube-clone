import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import {FaFeatherAlt } from "react-icons/fa"

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

interface NavBarProps {
  setSearchData: (data: VideoItem[]) => void;
}

function NavBar({ setSearchData }: NavBarProps) {
  const navigate = useNavigate();

  function handleHome() {
    navigate("/");
  }

  return (
    <div className="flex bg-[#1D202A] justify-between sm:flex-row sticky top-0 sm:mx-5 p-2 sm:p-3 items-center gap-3 sm:gap-0">
      <div className="flex justify-between items-center px-2 sm:px-3 sm:w-auto">
        <div className="flex items-center cursor-pointer">
          <div className="mr-1 stroke-0.5" onClick={handleHome}><FaFeatherAlt  size={30} /></div>
        </div>
      </div>
      <SearchBar setSearchData={setSearchData} />
      <div className=" sm:flex justify-between items-center pl-3">
        <div className="cursor-pointer rounded-full mr-5">
          <Bell  className="rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
