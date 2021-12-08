export interface LoginValues {
  username: string;
  password: string;
}

export interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  pin: string;
}

export interface LoginApiReturn {
  id: number;
  code: string;
  name: string;
  enabled: boolean;
}

export interface UserModel {
  id: number;
  code: string;
  name: string;
  enabled: boolean;
}

export interface UserMetadatumModel {
  id: number;
}