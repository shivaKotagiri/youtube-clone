import Profile from '../assets/user_profile.jpg'
import converter from '../converter';

interface YouTubeChannel {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url:string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
  };
}

interface VideoInfoProps {
  channelInfo: YouTubeChannel | null;
}

function VideoInfo({ channelInfo }: VideoInfoProps) {

  const subscriberCount = channelInfo?.statistics?.subscriberCount
    ? converter(parseInt(channelInfo.statistics.subscriberCount))
    : '';

  const channelTitle = channelInfo?.snippet?.title || 'Channel Name';

  const channelImage = channelInfo?.snippet?.thumbnails?.default?.url || Profile;

  return (
    <>
      <div className='flex bg-[#1D202A] justify-between'>
        <div className='flex items-center'>
          <div className='mr-3'>
            <img src={channelImage} alt="Channel Logo" className='rounded-full w-10'/>
          </div>
          <div className='flex flex-col'>
            <div>{channelTitle}</div>
            <div>{subscriberCount} Subscribers</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoInfo
