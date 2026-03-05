import { useState } from "react";
import Icon from "@/components/ui/icon";
import { users } from "@/data/mockData";

export default function FriendsPage() {
  const [friendStates, setFriendStates] = useState<Record<number, boolean>>(
    Object.fromEntries(users.map(u => [u.id, u.isFriend]))
  );
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">("friends");

  const toggle = (id: number) => {
    setFriendStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const friends = users.filter(u => friendStates[u.id]);
  const suggestions = users.filter(u => !friendStates[u.id]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <h2 className="text-xl font-bold mb-3">Друзья</h2>
        <div className="flex gap-1 bg-muted rounded-xl p-1">
          {(["friends", "suggestions"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab === "friends" ? `Мои друзья (${friends.length})` : "Знакомые"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-2">
        {(activeTab === "friends" ? friends : suggestions).map((user, i) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3.5 bg-card rounded-2xl border border-border animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "forwards" }}
          >
            <div className="relative">
              <img src={user.avatar} className="w-14 h-14 rounded-full object-cover" alt="" />
              {user.online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-card" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.online ? (
                  <span className="text-green-400">● в сети</span>
                ) : "● не в сети"}
              </p>
            </div>
            <div className="flex gap-2">
              {activeTab === "friends" && (
                <button className="px-3 py-1.5 bg-muted rounded-xl text-xs text-muted-foreground">
                  Чат
                </button>
              )}
              <button
                onClick={() => toggle(user.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  friendStates[user.id]
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-white"
                }`}
              >
                {friendStates[user.id] ? "Удалить" : "+ Добавить"}
              </button>
            </div>
          </div>
        ))}

        {activeTab === "friends" && friends.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="Users" size={28} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Пока нет друзей</p>
            <p className="text-muted-foreground text-xs mt-1">Перейди во вкладку «Знакомые»</p>
          </div>
        )}
      </div>
    </div>
  );
}
