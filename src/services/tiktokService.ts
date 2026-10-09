import axios from 'axios';

export interface TikTokVideoMetadata {
  id: string;
  title: string;
  coverUrl: string;
  videoNoWatermarkUrl: string;
  videoWatermarkUrl?: string;
  audioUrl?: string;
  author: {
    nickname: string;
    username: string;
    avatar: string;
  };
  stats: {
    plays: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export class TikTokService {
  public static sanitizeUrl(rawUrl: string): string {
    const match = rawUrl.match(/https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\/[^\s]+/i);
    if (!match) {
      throw new Error('URL TikTok tidak valid. Gunakan format tiktok.com atau vt.tiktok.com');
    }
    return match[0];
  }

  public static async fetchVideoInfo(url: string): Promise<TikTokVideoMetadata> {
    const sanitized = this.sanitizeUrl(url);
    
    const endpoint = 'https://www.tikwm.com/api/';
    const response = await axios.post(
      endpoint,
      new URLSearchParams({ url: sanitized }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 10000
      }
    );

    const data = response.data;
    if (!data || data.code !== 0 || !data.data) {
      throw new Error(data?.msg || 'Gagal mengekstrak video. Pastikan tautan bersifat publik.');
    }

    const raw = data.data;
    return {
      id: raw.id || String(Date.now()),
      title: raw.title || 'Video Tanpa Judul',
      coverUrl: raw.cover || '',
      videoNoWatermarkUrl: raw.play || '',
      videoWatermarkUrl: raw.wmplay || undefined,
      audioUrl: raw.music || undefined,
      author: {
        nickname: raw.author?.nickname || 'Pengguna TikTok',
        username: raw.author?.unique_id || 'unknown',
        avatar: raw.author?.avatar || ''
      },
      stats: {
        plays: raw.play_count || 0,
        likes: raw.digg_count || 0,
        comments: raw.comment_count || 0,
        shares: raw.share_count || 0
      }
    };
  }
}