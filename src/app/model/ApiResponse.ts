export interface ApiResponse<T> {
  status: number;
  mensaje: string;
  data: T;
}
