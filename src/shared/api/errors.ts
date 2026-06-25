export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    const fallback = `Request failed with status ${response.status}`;

    try {
      const data = await response.json();
      const message =
        data && typeof data.message === 'string' ? data.message : fallback;

      return new ApiError(response.status, message);
    } catch {
      return new ApiError(response.status, fallback);
    }
  }
}
