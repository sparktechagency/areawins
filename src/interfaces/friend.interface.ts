export interface FriendRequest {
  _id: string;
  sender: string; // ObjectId Reference
  receiver: string; // ObjectId Reference
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  respondedAt?: string;
}

export interface FriendRelation {
  _id: string;
  user: string; // ObjectId Reference
  friend: string; // ObjectId Reference
  createdAt: string;
}

export interface BlockedUser {
  _id: string;
  blocker: string; // ObjectId Reference
  blocked: string; // ObjectId Reference
  createdAt: string;
}

// For UI components
export interface ReferredFriend {
  id: number;
  name: string;
  email: string;
  joinedDate: string;
  status: string;
  earned: number;
  avatar: string;
}
