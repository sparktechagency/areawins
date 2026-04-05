export interface IPaymentSetting {
  _id: string;
  name: string;
  method: string;
  details: string;
  imageUrl: string;
  isActive: boolean;
  minDeposit: number;
  maxDeposit: number;
}
