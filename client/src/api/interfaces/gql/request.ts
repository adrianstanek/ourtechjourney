export interface IGQLReturn<T> {
    data: T;
    errors?: { message: string, statusCode: number }[];
}

export interface IGQLRequest {
    query: string;
    variables?: { [key: string]: unknown };
}
