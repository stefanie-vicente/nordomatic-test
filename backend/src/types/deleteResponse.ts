export type DeleteResponse = {
  success: boolean;
  message: string;
  id?: number;
  operation?: string;
  errorCode?: "NOT_FOUND" | "DATABASE_ERROR" | "UNEXPECTED_ERROR";
};
