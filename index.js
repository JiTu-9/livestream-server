const NodeMediaServer = require('node-media-server');
const { execSync } = require('child_process');

// Function to get the ffmpeg path dynamically
function getFfmpegPath() {
  try {
    const ffmpegPath = execSync('which ffmpeg').toString().trim();
    return ffmpegPath;
  } catch (error) {
    console.error('Error fetching ffmpeg path:', error);
    return null;
  }
}

const ffmpegPath = getFfmpegPath();

if (!ffmpegPath) {
  console.error('ffmpeg path not found. Exiting...');
  process.exit(1);
}

// Node Media Server Configuration
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
  },
  http: {
    port: 8000,
    mediaroot: 'livestream',
    allow_origin: '*',
    listen : '0.0.0.0'
  },
  trans: {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: 'live',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=1:hls_list_size=20:hls_segment_type=fmp4]',
        dash: false
      },
      {
        app: 'vod',
        ac: 'aac',
        mp4: true,
        mp4Flags: '[movflags=faststart]'
      }
    ]
  },
  logType: 3
};

// Initialize Node Media Server
const nms = new NodeMediaServer(config);
nms.run();
