'use client';

import { useEffect, useRef, useState } from 'react';

const heroVideos = [
  { src: '/videos/hero-santiago.mp4', className: 'is-santiago' },
  { src: '/videos/hero-red-incendio.mp4', className: 'is-red-incendio' },
];

export function HeroVideoRotator() {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeVideo) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeVideo]);

  const showNextVideo = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setActiveVideo((current) => (current + 1) % heroVideos.length);
  };

  return (
    <div className="hero-video-stage" aria-hidden="true">
      {heroVideos.map((video, index) => (
        <video
          className={`hero-video ${video.className} ${index === activeVideo ? 'is-active' : ''}`}
          key={video.src}
          ref={(element) => { videoRefs.current[index] = element; }}
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          onEnded={index === activeVideo ? showNextVideo : undefined}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
