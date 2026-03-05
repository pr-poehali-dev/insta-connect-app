export const AVATAR_1 = "https://cdn.poehali.dev/projects/66143f57-5a8a-4f14-a37e-e3d9674e8674/files/450c76bd-3984-416c-941a-8b28ef1c7b33.jpg";
export const POST_IMG_1 = "https://cdn.poehali.dev/projects/66143f57-5a8a-4f14-a37e-e3d9674e8674/files/419fbf48-bb84-4100-8a96-b63f9957c63e.jpg";
export const POST_IMG_2 = "https://cdn.poehali.dev/projects/66143f57-5a8a-4f14-a37e-e3d9674e8674/files/f7af03b2-b3bc-4e5d-a610-47b1a2dcafa7.jpg";

export const users = [
  { id: 1, name: "Алина К.", username: "alina_k", avatar: AVATAR_1, online: true, isFriend: true },
  { id: 2, name: "Максим В.", username: "max_v", avatar: AVATAR_1, online: false, isFriend: true },
  { id: 3, name: "София Р.", username: "sofia_r", avatar: AVATAR_1, online: true, isFriend: false },
  { id: 4, name: "Иван П.", username: "ivan_p", avatar: AVATAR_1, online: true, isFriend: false },
  { id: 5, name: "Дарья Л.", username: "dasha_l", avatar: AVATAR_1, online: false, isFriend: false },
  { id: 6, name: "Кирилл М.", username: "kirill_m", avatar: AVATAR_1, online: true, isFriend: true },
];

export const stories = [
  { id: 1, user: users[0], viewed: false, image: POST_IMG_1 },
  { id: 2, user: users[1], viewed: false, image: POST_IMG_2 },
  { id: 3, user: users[2], viewed: true, image: POST_IMG_1 },
  { id: 4, user: users[3], viewed: false, image: POST_IMG_2 },
  { id: 5, user: users[5], viewed: false, image: POST_IMG_1 },
];

export const posts = [
  {
    id: 1,
    user: users[0],
    image: POST_IMG_1,
    caption: "Ночной город никогда не спит ✨ Люблю такие прогулки когда всё затихает...",
    likes: 347,
    liked: false,
    comments: [
      { id: 1, user: users[1], text: "Огонь фото! 🔥", liked: false, likes: 12 },
      { id: 2, user: users[2], text: "Где это снято? Хочу туда!", liked: false, likes: 5 },
    ],
    time: "2 ч назад",
  },
  {
    id: 2,
    user: users[1],
    image: POST_IMG_2,
    caption: "Уютный вечер в кафе ☕ Когда снаружи дождь, а внутри тепло и пахнет кофе...",
    likes: 214,
    liked: true,
    comments: [
      { id: 1, user: users[3], text: "Завидую белой завистью 😍", liked: false, likes: 8 },
    ],
    time: "5 ч назад",
  },
  {
    id: 3,
    user: users[2],
    image: POST_IMG_1,
    caption: "Новый день — новые возможности 🌙",
    likes: 89,
    liked: false,
    comments: [],
    time: "вчера",
  },
];

export const chats = [
  {
    id: 1,
    user: users[0],
    lastMessage: "Увидимся сегодня вечером?",
    time: "сейчас",
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Привет! Как дела?", time: "18:30" },
      { id: 2, from: "me", text: "Всё отлично, спасибо! А у тебя?", time: "18:32" },
      { id: 3, from: "them", text: "Тоже хорошо! Увидимся сегодня вечером?", time: "18:35" },
    ]
  },
  {
    id: 2,
    user: users[1],
    lastMessage: "Посмотри какое фото я сделал!",
    time: "1 ч",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Макс, привет!", time: "16:00" },
      { id: 2, from: "them", text: "Посмотри какое фото я сделал!", time: "16:05" },
    ]
  },
  {
    id: 3,
    user: users[5],
    lastMessage: "ок 👍",
    time: "вчера",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Завтра встречаемся?", time: "20:00" },
      { id: 2, from: "me", text: "ок 👍", time: "20:01" },
    ]
  },
];

export const myProfile = {
  id: 0,
  name: "Вы",
  username: "my_profile",
  avatar: AVATAR_1,
  bio: "Люблю фотографировать ночной город и пить кофе в уютных кафе ☕",
  posts: 42,
  friends: 318,
  followers: 1240,
};
