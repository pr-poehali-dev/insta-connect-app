import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Comment {
  id: number;
  user: { name: string; avatar: string };
  text: string;
  liked: boolean;
  likes: number;
}

interface Post {
  id: number;
  user: { name: string; username: string; avatar: string; online: boolean };
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  time: string;
}

interface Props {
  post: Post;
  animDelay?: string;
}

export default function PostCard({ post, animDelay = "0s" }: Props) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({});

  const handleLike = () => {
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
  };

  const handleCommentLike = (id: number) => {
    setLikedComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      user: { name: "Вы", avatar: post.user.avatar },
      text: newComment,
      liked: false,
      likes: 0,
    }]);
    setNewComment("");
  };

  return (
    <div
      className="post-card overflow-hidden opacity-0 animate-fade-up"
      style={{ animationDelay: animDelay, animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-3 p-3.5">
        <div className="relative">
          <img src={post.user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
          {post.user.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-card" />
          )}
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">{post.user.name}</p>
          <p className="text-xs text-muted-foreground">@{post.user.username} · {post.time}</p>
        </div>
        <button className="ml-auto text-muted-foreground">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>

      <div className="relative">
        <img src={post.image} alt="" className="w-full aspect-square object-cover" />
      </div>

      <div className="p-3.5">
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition-all active:scale-90 ${liked ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name={liked ? "Heart" : "Heart"} size={22} className={liked ? "fill-red-500 text-red-500" : ""} />
            <span>{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(s => !s)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="MessageCircle" size={22} />
            <span>{comments.length}</span>
          </button>

          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Send" size={21} />
          </button>

          <button
            onClick={() => setSaved(s => !s)}
            className={`ml-auto transition-colors ${saved ? "text-neon" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name="Bookmark" size={22} className={saved ? "fill-neon text-neon" : ""} />
          </button>
        </div>

        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-semibold">{post.user.name} </span>
          {post.caption}
        </p>

        {showComments && (
          <div className="mt-3 space-y-2 animate-fade-up">
            {comments.map(c => (
              <div key={c.id} className="flex items-start gap-2.5">
                <img src={c.user.avatar} className="w-7 h-7 rounded-full object-cover flex-shrink-0" alt="" />
                <div className="flex-1 bg-muted rounded-xl px-3 py-2">
                  <p className="text-xs font-semibold">{c.user.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.text}</p>
                </div>
                <button
                  onClick={() => handleCommentLike(c.id)}
                  className={`flex-shrink-0 flex flex-col items-center gap-0.5 ${likedComments[c.id] ? "text-red-500" : "text-muted-foreground"}`}
                >
                  <Icon name="Heart" size={14} className={likedComments[c.id] ? "fill-red-500" : ""} />
                  <span className="text-[10px]">{c.likes + (likedComments[c.id] ? 1 : 0)}</span>
                </button>
              </div>
            ))}

            <div className="flex gap-2 mt-3">
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddComment()}
                placeholder="Напиши комментарий..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary"
              />
              <button onClick={handleAddComment} className="text-primary">
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
