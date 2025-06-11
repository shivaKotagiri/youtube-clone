/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, JSX } from 'react';
import { ThumbsDown, ThumbsUp, Save, ChevronUp, ChevronDown } from 'lucide-react';
import { IosShare } from "@mui/icons-material";
import VideoInfo from '../components/VideoInfo';
import Recommendations from '../components/Recommendations';
import { useParams } from 'react-router-dom';
import converter from '../converter';
import axios from 'axios';
import moment from 'moment';

interface VideoData {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    categoryId: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
  };
}

interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
  };
}

interface YouTubeChannelResponse {
  items: YouTubeChannel[];
}

function VideoPlay(): JSX.Element {
  const { videoId } = useParams<{ videoId: string, categoryId: string }>();
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
  const [expandDescription, setExpandDescription] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_YOUTUBE_API as string;

        const videoRes = await axios.get<{ items: VideoData[] }>(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
        );

        if (videoRes.data.items && videoRes.data.items.length > 0) {
          const videoData = videoRes.data.items[0];
          setVideoData(videoData);

          const channelRes = await axios.get<YouTubeChannelResponse>(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${videoData.snippet.channelId}&key=${API_KEY}`
          );

          if (channelRes.data.items && channelRes.data.items.length > 0) {
            setChannelInfo(channelRes.data.items[0]);
          }
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchData();
    }
  }, [videoId]);

  if (loading) {
    return <div className="p-5 h-screen justify-center items-center text-center">Loading video...</div>;
  }

  const isLongDescription = videoData?.snippet?.description && videoData.snippet.description.length > 200;
  return (
    <div className='bg-[#1D202A] w-full min-h-screen'>
      <div className='max-w-screen-xl mx-auto'>
        <div className='p-3 md:p-5'>
          <div className='w-full aspect-video'>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1`} title={videoData?.snippet?.title || "Video title unavailable"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className='rounded-lg shadow-md'>
            </iframe>
          </div>

          <div className='font-semibold text-xl md:text-2xl mt-3'>{videoData?.snippet?.title}</div>

          <div className='flex flex-col sm:flex-row sm:justify-between mt-2 gap-3'>
            <div className='text-gray-300'>
              <span>{converter(parseInt(videoData?.statistics?.viewCount || "0"))} views</span>
              <span className='mx-1'>•</span>
              <span>{videoData?.snippet?.publishedAt ? moment(videoData.snippet.publishedAt).fromNow() : "Unknown time"}</span>
            </div>
            <div className='flex flex-wrap gap-3'>
              <div className='flex items-center p-2 rounded-full cursor-pointer transition'>
                <div className='mr-1'><ThumbsUp size={18} /></div>
                <div>{converter(parseInt(videoData?.statistics?.likeCount || "0"))}</div>
              </div>
              <div className='flex items-center p-2 rounded-full cursor-pointer transition'>
                <div className='mr-1'><ThumbsDown size={18} /></div>
                <div>{converter(parseInt(videoData?.statistics?.dislikeCount || "0"))}</div>
              </div>
              <div className='flex items-center p-2 rounded-full cursor-pointer transition'>
                <div className='mr-1'><IosShare fontSize="small" /></div>
                <div>Share</div>
              </div>
              <div className='flex items-center p-2 rounded-full cursor-pointer transition'>
                <div className='mr-1'><Save size={18} /></div>
                <div>Save</div>
              </div>
            </div>
          </div>

          <hr className='my-3 text-gray-300' />

          <div className="bg-[#1D202A] text-white rounded-xl p-4 shadow">
            <div className="mb-4"><VideoInfo channelInfo={channelInfo} /></div>
            <div className="mt-4">
              <div className={`text-gray-200 text-sm ${expandDescription ? '' : 'line-clamp-3'}`}>
                {expandDescription
                  ? videoData?.snippet?.description
                  : videoData?.snippet?.description?.substring(0, 200) + (isLongDescription ? "..." : "")}
              </div>
              {isLongDescription && (
                <button onClick={() => setExpandDescription(prev => !prev)} className="flex items-center gap-1 mt-2 text-gray-400 hover:text-gray-200 transition cursor-pointer">{expandDescription?(<>Show less <ChevronUp size={16} /></>):(<>Show more <ChevronDown size={16} /></> )}
                </button>
              )}
            </div>
          </div>

          <hr className='my-4 text-gray-300' />

          <div className='bg-[#1D202A] text-white rounded-xl p-4 shadow'>
            <h2 className='text-xl font-semibold mb-4 bg-[#1D202A]'>Recommended Videos</h2>
            <div className='bg-[#1D202A]'><Recommendations categoryId={videoData?.snippet.categoryId} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
