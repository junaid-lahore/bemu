'use client';

import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { useRouter } from 'next/navigation';

interface VideoPlayerProps {
  url: string;
  nextUrl: string | null;
  title: string;
}

export function VideoPlayer({ url, nextUrl, title }: VideoPlayerProps) {
  const router = useRouter();

  const handleEnded = () => {
    if (nextUrl) {
      router.push(nextUrl);
    }
  };

  return (
    <div className="w-full h-full">
      <ReactPlayer
        url={url}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
        onEnded={handleEnded}
        config={{
            playerVars: { showinfo: 1 }
        }}
      />
    </div>
  );
}
