export interface LoginValues {
  id: number;
  code: string;
  name: string;
  enabled: boolean;
}

export interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}