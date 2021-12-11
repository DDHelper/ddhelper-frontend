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
  username: string;
  uid: number;
  email: string;
}

export interface UserApiReturn {
  code: number;
  data: {
    username: string;
    uid: number;
    email: string;
  };
}

export interface SearchSubsribeApiReturn {
  code: number;
  data: {
    mid: number;
    uname: string;
    fans: number;
    usign: string;
    upic: string;
    raw: object;
  };
}

export interface UserMetadatumModel {
  id: number;
}
