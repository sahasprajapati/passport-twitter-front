export interface Response<T> {
  data?: T;
  message: string;
  success: boolean;
}

export interface AuthDTO {
  username: string;
  token: string;
}

export interface ProfileDTO {
  username: string;
  id: string;
}
