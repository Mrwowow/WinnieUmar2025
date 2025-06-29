import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    // Create audio element and set properties
    if (audio) {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      // Try to autoplay on component mount
      if (!autoplayAttempted) {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started successfully
              setIsPlaying(true);
            })
            .catch(error => {
              // Autoplay was prevented by browser policy
              console.log('Autoplay prevented, waiting for user interaction:', error);
              // Set up a one-time click handler to enable audio on first user interaction
              const enableAudio = () => {
                if (audioRef.current) {
                  audioRef.current.play().catch(e => console.error('Error playing audio:', e));
                }
                document.removeEventListener('click', enableAudio);
              };
              document.addEventListener('click', enableAudio);
            });
        }
        setAutoplayAttempted(true);
      }
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
    };
  }, [autoplayAttempted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef} 
        src="/music/Winnie-Omar.mp3" 
        loop 
      />
      <button
        onClick={togglePlay}
        className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full shadow-lg transition-all duration-300 w-10 h-10"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
