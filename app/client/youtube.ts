export class YoutubeClient {
  baseUrl: string;
  apiKey?: string;

  constructor() {
    this.baseUrl = "https://www.googleapis.com/youtube/v3";
    this.apiKey = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;

    if (!this.apiKey) {
      throw new Error("EXPO_PUBLIC_YOUTUBE_API_KEY is not set");
    }
  }

  async search(query: string, maxResults = 5): Promise<SearchResults> {
    const url = `${this.baseUrl}/search?part=snippet&q=${query}&key=${this.apiKey}&maxResults=${maxResults}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async getPlaylistItems(playlistId: string, maxResults = 5) {
    const url = `${this.baseUrl}/playlistItems?part=snippet&playlistId=${playlistId}&key=${this.apiKey}&maxResults=${maxResults}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async getVideoDetails(videoId: string): Promise<VideoDetails> {
    const url = `${this.baseUrl}/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

type SearchResults = {
  pageInfo: {
    totalResults: number;
  };
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      channelTitle: string;
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
          width: number;
          height: number;
        };
      };
      publishedAt: string;
    };
  }>;
};

type VideoDetails = {
  items: Array<{
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    statistics: {
      viewCount: number;
      likeCount: number;
    };
  }>;
};
