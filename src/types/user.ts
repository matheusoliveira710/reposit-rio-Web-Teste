export interface UserWallet {
  id: string;
  balance: {
    [key: string]: number; // crypto symbol -> amount
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}