import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import VideoPlay from './pages/VideoPlay';
import Footer from './components/Footer';

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

function App() {
  const [searchResults, setSearchResults] = useState<VideoItem[]>([]);

  const handleSearchResults = (results: VideoItem[]) => {
    setSearchResults(results);
  };
  return (
    <>
      <div className='bg-[#1D202A] text-white'>
        <NavBar setSearchData={handleSearchResults} />
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/video/:categoryId/:videoId" element={<VideoPlay />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
