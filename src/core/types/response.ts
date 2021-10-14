export interface Response<T> {
  success: true | false;
  message?: string;
  data?: T;
}
