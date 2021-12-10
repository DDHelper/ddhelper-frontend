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

export interface PinValues {
  email: string;
}

export interface LoginApiReturn {
  code: number;
  msg?: string;
  data?: object;
}

export interface RegisterApiReturn {
  code: number;
  msg: string;
}

export interface PinApiReturn {
  code: number;
  msg: string;
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
