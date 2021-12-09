export interface LoginValues {
  username: string;
  password: string;
}

export interface RegisterValues {
  username: FormDataEntryValue;
  password: FormDataEntryValue;
  confirmPassword: FormDataEntryValue;
  email: FormDataEntryValue;
  pin: FormDataEntryValue;
}

export interface PinValues {
  email: FormDataEntryValue | null;
}

export interface LoginApiReturn {
  id: number;
  code: string;
  name: string;
  enabled: boolean;
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
