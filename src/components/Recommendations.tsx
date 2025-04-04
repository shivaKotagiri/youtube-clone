/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useState, useEffect } from 'react';
import converter from '../converter';
import { Link } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_YOUTUBE_API;

interface PropsCheck {
  categoryId: string | undefined;
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default?: {url: string;};
    };
    channelTitle: string;
    categoryId: string;
  };
  statistics: {
    viewCount: string;
  };
}

interface YouTubeVideoListResponse {
  items: YouTubeVideo[];
}

function Recommendations({ categoryId }: PropsCheck) {
  const [recommendationsData, setRecommendationsData] = useState<YouTubeVideoListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRecommendationsApi = async () => {
    try {
      setLoading(true);
      const res = await axios.get<YouTubeVideoListResponse>(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=12&key=${API_KEY}&videoCategoryId=${categoryId}`);
      setRecommendationsData(res.data);
    }  finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleRecommendationsApi();
  }, [categoryId]);

  return (
    <div className="flex flex-col bg-[#1D202A] space-y-3">
      {loading && <p>Loading...</p>}

      {recommendationsData?.items.map((item) => {
        const thumbnail = item.snippet.thumbnails.default?.url;

        return (
          <Link key={item.id} to={`/video/${item.snippet.categoryId}/${item.id}`}>
            <div className="flex flex-row gap-3 cursor-pointer hover:bg-[#23262F] p-2 rounded-lg">
              <div className="flex-shrink-0 w-40 sm:w-48 lg:w-40">{thumbnail && (<img src={thumbnail} alt={`${item.snippet.channelTitle} thumbnail`} className="rounded-md w-full object-cover h-24"/> )}
              </div>

              <div className="flex flex-col justify-start">
                <div className="font-medium text-sm line-clamp-2">{item.snippet.title}</div>
                <div className="text-sm text-gray-500 mt-1">{item.snippet.channelTitle}</div>
                <div className="text-xs text-gray-500 mt-1">{converter(parseInt(item.statistics.viewCount))} views
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recommendations;
