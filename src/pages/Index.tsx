import { useState } from "react";
import Icon from "@/components/ui/icon";
import FeedPage from "./FeedPage";
import SearchPage from "./SearchPage";
import ChatsPage from "./ChatsPage";
import FriendsPage from "./FriendsPage";
import ProfilePage from "./ProfilePage";

type Tab = "feed" | "search" | "chats" | "friends" | "profile";

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "feed", icon: "Home", label: "Лента" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "friends", icon: "Users", label: "Друзья" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const renderPage = () => {
    switch (activeTab) {
      case "feed": return <FeedPage />;
      case "search": return <SearchPage />;
      case "chats": return <ChatsPage />;
      case "friends": return <FriendsPage />;
      case "profile": return <ProfilePage />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(220,15%,3%)]">
      <div
        className="relative bg-background overflow-hidden flex flex-col"
        style={{
          width: "100%",
          maxWidth: "430px",
          height: "100svh",
          maxHeight: "932px",
        }}
      >
        <div className="flex-1 overflow-hidden">
          {renderPage()}
        </div>

        <nav className="bottom-nav absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 py-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`transition-transform ${isActive ? "scale-110" : ""}`}>
                  {tab.id === "chats" ? (
                    <div className="relative">
                      <Icon name={tab.icon} size={24} />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                        2
                      </span>
                    </div>
                  ) : (
                    <Icon name={tab.icon} size={24} />
                  )}
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
