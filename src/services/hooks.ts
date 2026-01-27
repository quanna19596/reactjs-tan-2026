import {
  type DefaultError,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAxiosMutation = <
  TData = unknown,
  TVariables = void,
  TErrorData = DefaultError,
  TContext = unknown,
>(
  options: UseMutationOptions<
    TData,
    AxiosError<TErrorData>,
    TVariables,
    TContext
  >,
): UseMutationResult<TData, AxiosError<TErrorData>, TVariables, TContext> => {
  return useMutation<TData, AxiosError<TErrorData>, TVariables, TContext>(
    options,
  );
};
