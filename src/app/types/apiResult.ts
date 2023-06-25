
export type SuccessResult<T> = T extends void
  ? { success: true }
  : { success: true; data: T };

export type FailResult = {
  success: false;
  error: string;
  message: any;
  statusCode: string;
};
