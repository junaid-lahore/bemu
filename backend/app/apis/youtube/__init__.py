from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import databutton as db
import requests

router = APIRouter(prefix="/youtube")

class YouTubeStats(BaseModel):
    subscriber_count: str
    view_count: str
    video_count: str
    channel_name: str

@router.get("/stats")
async def get_youtube_stats() -> YouTubeStats:
    """Fetch real-time YouTube channel statistics"""
    try:
        api_key = db.secrets.get("YOUTUBE_API_KEY")
        channel_handle = "@BeamuAdventures"
        
        # Get channel ID from handle
        search_url = "https://www.googleapis.com/youtube/v3/search"
        search_params = {
            'part': 'snippet',
            'q': channel_handle,
            'type': 'channel',
            'key': api_key,
            'maxResults': 1
        }
        
        search_response = requests.get(search_url, params=search_params)
        search_data = search_response.json()
        
        if 'items' not in search_data or len(search_data['items']) == 0:
            raise HTTPException(status_code=404, detail="Channel not found")
        
        channel_id = search_data['items'][0]['snippet']['channelId']
        
        # Get channel statistics
        stats_url = "https://www.googleapis.com/youtube/v3/channels"
        stats_params = {
            'part': 'statistics,snippet',
            'id': channel_id,
            'key': api_key
        }
        
        stats_response = requests.get(stats_url, params=stats_params)
        stats_data = stats_response.json()
        
        if 'items' not in stats_data or len(stats_data['items']) == 0:
            raise HTTPException(status_code=404, detail="Channel stats not found")
        
        channel = stats_data['items'][0]
        stats = channel['statistics']
        snippet = channel['snippet']
        
        # Format numbers nicely
        def format_number(num_str):
            num = int(num_str)
            if num >= 1_000_000:
                return f"{num / 1_000_000:.1f}M+"
            elif num >= 1_000:
                return f"{num / 1_000:.0f}K+"
            else:
                return f"{num}+"
        
        return YouTubeStats(
            subscriber_count=format_number(stats.get('subscriberCount', '0')),
            view_count=format_number(stats.get('viewCount', '0')),
            video_count=stats.get('videoCount', '0'),
            channel_name=snippet['title']
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching YouTube stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch YouTube statistics")
