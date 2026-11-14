const BASE_URL = "https://dummyjson.com";

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export function isHttpError(error: unknown,): error is HttpError {
  return error instanceof HttpError;
}

export async function fetchJson<T>(endpoint: string,options?: RequestInit,): Promise<T> {
  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    },
  );

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const data: unknown = await response.json();

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        message = data.message;
      }
    } catch {
      // Keep default error message.
    }

    throw new HttpError(message,response.status,);
  }

  return response.json() as Promise<T>;
}