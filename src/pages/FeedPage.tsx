import { useState } from "react";
import Icon from "@/components/ui/icon";
import PostCard from "@/components/PostCard";
import StoryViewer from "@/components/StoryViewer";
import { stories, posts } from "@/data/mockData";

export default function FeedPage() {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="featherGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="hsl(320,100%,65%)" />
                <stop offset="100%" stopColor="hsl(280,100%,70%)" />
              </linearGradient>
            </defs>
            <path d="M24 3C24 3 18 4 13 9C9 13 7 18 6 22L8 20C9 16 11 12 15 9C17 7.5 20 6.5 22 6C20 9 18 12 16 15L18 14C21 11 23 7 24 3Z" fill="url(#featherGrad)" />
            <path d="M6 22C6 22 9 19 13 17C11 19 9.5 21.5 9 24" stroke="url(#featherGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M13 17L8 20" stroke="url(#featherGrad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
          <h1 className="text-2xl font-black gradient-text tracking-tight">DIPERO</h1>
        </div>
        <div className="flex gap-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors relative">
            <Icon name="Bell" size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="PlusSquare" size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/10">
              <Icon name="Plus" size={22} className="text-primary" />
            </div>
            <span className="text-[11px] text-muted-foreground">Моя</span>
          </div>

          {stories.map((story, i) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(i)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div className={story.viewed ? "opacity-50" : "story-ring"}>
                <div className="story-ring-inner">
                  <img
                    src={story.user.avatar}
                    className="w-14 h-14 rounded-full object-cover"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground max-w-[60px] truncate">
                {story.user.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>

        <div className="h-px bg-border mx-4 mb-3" />

        <div className="flex flex-col gap-4 px-4 pb-24">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              animDelay={`${i * 0.1}s`}
            />
          ))}
        </div>
      </div>

      {activeStory !== null && (
        <StoryViewer
          stories={stories}
          startIndex={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </div>
  );
}