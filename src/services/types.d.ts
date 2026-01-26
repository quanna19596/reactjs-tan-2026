export namespace TCommonService {
  export type TRequest<TPaths = {}, TQueries = {}, TBody = {}> = {
    paths?: TPaths;
    queries?: TQueries;
    body?: TBody;
  };

  export type TResponse<T = {}> = T;
}
