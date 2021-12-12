// post Login
export interface LoginValues {
  username: string;
  password: string;
}

export interface LoginApiReturn {
  code: number;
  msg?: string;
  data?: object;
}

// post Register
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

export interface RegisterApiReturn {
  code: number;
  msg: string;
}

export interface PinApiReturn {
  code: number;
  msg: string;
}

// get User
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

// get SearchSubscribe
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

// post DoSubscribe
export interface DoSubscribeValues {
  mid: number;
  gid: Array<number>;
}

export interface DoSubscribeApiReturn {
  code: number;
  msg: string;
}

// get GroupList
export interface GroupListApiReturn {
  code: number;
  data: Array<{
    gid: number;
    group_name: string;
    count: number;
  }>;
}

// get GroupMember
export interface GroupMemberQueryModel {
  gid: number;
  page: number;
  size: number;
}

export interface GroupMemberApiReturn {
  code: number;
  data: {
    has_more: boolean;
    gid: number;
    group_name: string;
    count: number;
    page: number;
    pages: number;
    data: Array<{
      mid: number;
      name: string;
      face: string;
    }>;
  };
}

// post AddGroup
export interface AddGroupApiReturn {
  code: number;
  success: boolean;
  data: {
    gid: number;
    group_name: string;
  };
}

export interface UserMetadatumModel {
  id: number;
}
