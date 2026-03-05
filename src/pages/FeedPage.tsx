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
        <h1 className="text-2xl font-black gradient-text tracking-tight">вспышка</h1>
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
