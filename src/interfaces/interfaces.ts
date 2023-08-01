export interface User {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar?: string | null;
  bot?: boolean | null;
  system?: boolean | null;
  mfa_enabled?: boolean | null;
  banner?: string | null;
  accent_color?: number | null;
  locale?: string | null;
  verified?: boolean | null;
  email?: string | null;
  flags?: number | null;
  premium_type?: number | null;
  public_flags?: number | null;
  avatar_decoration?: string | null;
}

export interface Expense {
  id: string;
  name: string;
  e_type: string;
  amount: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}