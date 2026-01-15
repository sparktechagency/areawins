import { ReferredFriend } from "@/interfaces/friend.interface";

export const MOCK_REFERRED_FRIENDS: ReferredFriend[] = [
  {
    id: 1,
    name: "Rakib Hasan",
    email: "rakib@example.com",
    joinedDate: "2024-03-10",
    status: "Active",
    earned: 450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rakib",
  },
  {
    id: 2,
    name: "Ariful Islam",
    email: "arif@example.com",
    joinedDate: "2024-03-12",
    status: "Active",
    earned: 120,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arif",
  },
  {
    id: 3,
    name: "Sumon Ahmed",
    email: "sumon@example.com",
    joinedDate: "2024-03-15",
    status: "Pending",
    earned: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumon",
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    email: "mehedi@example.com",
    joinedDate: "2024-03-18",
    status: "Active",
    earned: 85,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehedi",
  },
];
