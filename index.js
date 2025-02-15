const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
  },
  http: {
    port: 8000,
    mediaroot: 'livestream',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: "/usr/bin/ffmpeg", // Dynamically set the ffmpeg path
    tasks: [
      {
        app: 'live1',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=1:hls_list_size=20:hls_segment_type=fmp4]',
        dash: false
      },
      {
        app: 'live2',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=1:hls_list_size=20:hls_segment_type=fmp4]',
        dash: false
      },
      {
        app: 'live3',
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
  logType: 3 // Enable debug logging
};

const nms = new NodeMediaServer(config);
nms.run();
