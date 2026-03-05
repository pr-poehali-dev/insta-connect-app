import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Story {
  id: number;
  user: { name: string; avatar: string };
  image: string;
}

interface Props {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
}

export default function StoryViewer({ stories, startIndex, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (current < stories.length - 1) {
            setCurrent(c => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [current]);

  const story = stories[current];

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full h-full max-w-md mx-auto"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={story.image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />

        <div className="absolute top-0 left-0 right-0 p-4 space-y-3">
          <div className="flex gap-1">
            {stories.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-none"
                  style={{
                    width: i < current ? "100%" : i === current ? `${progress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <img src={story.user.avatar} className="w-9 h-9 rounded-full object-cover border-2 border-white/50" alt="" />
            <span className="text-white font-semibold text-sm">{story.user.name}</span>
            <button onClick={onClose} className="ml-auto text-white">
              <Icon name="X" size={22} />
            </button>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-1/3" onClick={() => current > 0 && setCurrent(c => c - 1)} />
        <div className="absolute inset-y-0 right-0 w-1/3" onClick={() => {
          if (current < stories.length - 1) setCurrent(c => c + 1);
          else onClose();
        }} />

        <div className="absolute bottom-8 left-4 right-4">
          <input
            type="text"
            placeholder="Ответить..."
            className="w-full bg-white/10 border border-white/30 rounded-full px-4 py-2.5 text-white text-sm placeholder:text-white/50 outline-none"
            onClick={e => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}
