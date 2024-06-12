type DefaultErrorType = {
  path: string;
  message: string;
};

type ZodErrorType = {
  path: (string | number)[];
  message: string;
}[];

export type ErrorMessages = ZodErrorType | DefaultErrorType;
