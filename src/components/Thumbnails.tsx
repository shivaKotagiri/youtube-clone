import { Link } from 'react-router-dom';
import moment from 'moment';
import converter from '../converter';

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

interface CheckProps {
  response: VideoItem[];
}

function Thumbnails({response}:CheckProps) {

  return (
    <div className="container mx-auto px-2 sm:px-4 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {response.map((item, index) => (
          <div key={index} className="flex flex-col w-full">
            <Link to={`video/${item.snippet.categoryId}/${item.id}`}>
              <div className="cursor-pointer overflow-hidden rounded-md">
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="Thumbnail"
                  className="w-full h-auto rounded-md transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="font-semibold text-sm sm:text-base mt-2 line-clamp-2">
              {item.snippet.title}
            </div>
            <div className="text-xs sm:text-sm mt-1">
              <p className="cursor-pointer hover:text-gray-300">{item.snippet.channelTitle}</p>
              <div className="flex gap-1 items-center mt-1">
                <span>{converter(parseInt(item.statistics.viewCount))} views</span>
                <span className="text-gray-500">•</span>
                <span>{moment(item.snippet.publishedAt).fromNow()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Thumbnails;
