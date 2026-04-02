export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  nickname: string;
  customerId: string;
  profileImage: string;
  referralCode: string;
  referredUsers: IUser[];
  referralEarnings: number;
  phoneNumber?: string;
  country?: string;
  countryCode?: string;
  countryFlag?: string;
  isVerified: boolean;
  isBlocked: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}
