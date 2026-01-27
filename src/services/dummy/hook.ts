import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxiosMutation } from "@/services/hooks";
import DummyApi from "./api";
import { TDummyQueryKey } from "./enum";
import type { TDummyServiceType } from "./types";

export default {
  Auth: {
    useLogin: () => {
      return useAxiosMutation({
        mutationFn: DummyApi.Auth.login,
      });
    },
  },
  Products: {
    useGetAllProducts: (
      params: TDummyServiceType.TProducts.TGetAllProducts.TRequest,
    ) => {
      return useQuery({
        queryKey: [TDummyQueryKey.TProducts.GET_ALL_PRODUCTS, params],
        queryFn: () => DummyApi.Products.getAllProducts(params),
        placeholderData: keepPreviousData,
        staleTime: 60 * 1000,
      });
    },

    useGetSingleProduct: (
      params: TDummyServiceType.TProducts.TGetSingleProduct.TRequest,
    ) => {
      return useQuery({
        queryKey: [TDummyQueryKey.TProducts.GET_SINGLE_PRODUCT, params],
        queryFn: () => DummyApi.Products.getSingleProduct(params),
      });
    },

    useAddNewProduct: () => {
      const queryClient = useQueryClient();

      return useAxiosMutation({
        mutationFn: DummyApi.Products.addNewProduct,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TDummyQueryKey.TProducts.GET_ALL_PRODUCTS],
          });
          queryClient.invalidateQueries({
            queryKey: [TDummyQueryKey.TProducts.GET_SINGLE_PRODUCT],
          });
        },
      });
    },

    useUpdateProduct: () => {
      const queryClient = useQueryClient();

      return useAxiosMutation({
        mutationFn: DummyApi.Products.updateProduct,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TDummyQueryKey.TProducts.GET_ALL_PRODUCTS],
          });
          queryClient.invalidateQueries({
            queryKey: [TDummyQueryKey.TProducts.GET_SINGLE_PRODUCT],
          });
        },
      });
    },

    useDeleteProduct: () => {
      const queryClient = useQueryClient();

      return useAxiosMutation({
        mutationFn: DummyApi.Products.deleteProduct,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TDummyQueryKey.TProducts.GET_ALL_PRODUCTS],
          });
          queryClient.invalidateQueries({
            queryKey: [TDummyQueryKey.TProducts.GET_SINGLE_PRODUCT],
          });
        },
      });
    },
  },
};
