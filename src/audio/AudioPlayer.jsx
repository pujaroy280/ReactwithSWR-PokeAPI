import React, { useState, useEffect } from 'react';
import themeSong from '../audio/pokemon-theme-song-original2.mp3';

export function usePlayer(initialVolume = 0.5) {
  const [audio] = useState(new Audio(themeSong));
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    const handleEnded = () => {
      setPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  return [playing, toggle, volume, changeVolume];
}

export default function AudioPlayer() {
  const [playing, toggle, volume, changeVolume] = usePlayer();

  return (
    <div className="audio-player">
      <button className="play-button" onClick={toggle}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
      />
      <span className="audio-notif">{playing ? '♪ audio playing  ♪' : ''}</span>
    </div>
  );
}
