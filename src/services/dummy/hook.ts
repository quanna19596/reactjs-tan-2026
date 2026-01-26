import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import DummyApi from "./api";
import { TDummyQueryKey } from "./enum";
import type { TDummyServiceType } from "./types";

const DummyHook = {
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

    useAddNewProduct: (
      params: TDummyServiceType.TProducts.TAddNewProduct.TRequest,
    ) => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: () => DummyApi.Products.addNewProduct(params),
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

    useUpdateProduct: (
      params: TDummyServiceType.TProducts.TUpdateProduct.TRequest,
    ) => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: () => DummyApi.Products.updateProduct(params),
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

    useDeleteProduct: (
      params: TDummyServiceType.TProducts.TDeleteProduct.TRequest,
    ) => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: () => DummyApi.Products.deleteProduct(params),
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

export default DummyHook;
