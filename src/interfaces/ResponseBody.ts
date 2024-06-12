export interface IResponseBody {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}
