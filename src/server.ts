import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { z } from 'zod';
import axios from 'axios';
import { TikTokService } from './services/tiktokService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const AnalyzeSchema = z.object({
  url: z.string().url('Format URL tidak valid')
});

app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const parsed = AnalyzeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message || 'Input URL salah'
      });
    }

    const videoData = await TikTokService.fetchVideoInfo(parsed.data.url);
    return res.status(200).json({
      success: true,
      data: videoData
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Terjadi kesalahan internal server'
    });
  }
});

app.get('/api/proxy-download', async (req: Request, res: Response) => {
  const videoUrl = req.query.url as string;
  const filename = (req.query.filename as string) || 'tiktok-video.mp4';

  if (!videoUrl) {
    return res.status(400).send('Parameter URL wajib disertakan');
  }

  try {
    const response = await axios({
      method: 'GET',
      url: videoUrl,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Gagal mengunduh berkas melalui proxy.');
  }
});

app.listen(PORT, () => {
  console.log(`Server aktif pada http://localhost:${PORT}`);
});