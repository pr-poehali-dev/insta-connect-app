import { useState } from "react";
import Icon from "@/components/ui/icon";
import { users, posts } from "@/data/mockData";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <h2 className="text-xl font-bold mb-3">Поиск</h2>
        <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3">
          <Icon name="Search" size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Найти людей или посты..."
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground">
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-1 mt-3 bg-muted rounded-xl p-1">
          {(["users", "posts"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {tab === "users" ? "Люди" : "Посты"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {activeTab === "users" ? (
          <div className="space-y-1">
            {filteredUsers.map((user, i) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "forwards" }}
              >
                <div className="relative">
                  <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>
                <button className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  user.isFriend
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-white"
                }`}>
                  {user.isFriend ? "Друг" : "Добавить"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post, i) => (
              <div
                key={post.id}
                className="aspect-square rounded-lg overflow-hidden animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "forwards" }}
              >
                <img src={post.image} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
