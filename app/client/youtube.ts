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

  async search(query: string, maxResults = 5) {
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
}
