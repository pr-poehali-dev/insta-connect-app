import { useState } from "react";
import Icon from "@/components/ui/icon";
import { myProfile, posts } from "@/data/mockData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
        <h2 className="text-xl font-bold">Профиль</h2>
        <div className="flex gap-3">
          <button className="text-muted-foreground">
            <Icon name="Share2" size={22} />
          </button>
          <button className="text-muted-foreground">
            <Icon name="Settings" size={22} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="story-ring">
              <div className="story-ring-inner">
                <img
                  src={myProfile.avatar}
                  className="w-20 h-20 rounded-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <Icon name="Plus" size={12} className="text-white" />
            </button>
          </div>

          <div className="flex-1 pt-1">
            <p className="font-bold text-lg">{myProfile.name}</p>
            <p className="text-muted-foreground text-sm">@{myProfile.username}</p>
            <p className="text-sm text-foreground mt-2 leading-relaxed">{myProfile.bio}</p>
          </div>
        </div>

        <div className="flex justify-around mt-5 bg-muted rounded-2xl py-4">
          {[
            { label: "Посты", value: myProfile.posts },
            { label: "Друзья", value: myProfile.friends },
            { label: "Подписчики", value: myProfile.followers },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-black">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-3 py-2.5 bg-secondary rounded-2xl text-sm font-semibold text-foreground flex items-center justify-center gap-2">
          <Icon name="Pencil" size={16} />
          Редактировать профиль
        </button>
      </div>

      <div className="px-4 mb-3 flex-shrink-0">
        <div className="flex gap-1 bg-muted rounded-xl p-1">
          {(["posts", "saved"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Icon name={tab === "posts" ? "Grid3X3" : "Bookmark"} size={16} />
              <span className="text-sm font-medium">{tab === "posts" ? "Посты" : "Сохранённое"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 px-4">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className="aspect-square rounded-xl overflow-hidden animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
          >
            <img src={post.image} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
