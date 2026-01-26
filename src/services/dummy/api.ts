import DummyInstance from "./instance";
import type { TDummyServiceType } from "./types";

const DummyApi = {
  Products: {
    getAllProducts: async (
      params: TDummyServiceType.TProducts.TGetAllProducts.TRequest,
    ): Promise<TDummyServiceType.TProducts.TGetAllProducts.TResponse> => {
      const response = await DummyInstance.get(`/products`, {
        params: params.queries,
      });
      return response.data;
    },

    getSingleProduct: async (
      params: TDummyServiceType.TProducts.TGetSingleProduct.TRequest,
    ): Promise<TDummyServiceType.TProducts.TGetSingleProduct.TResponse> => {
      const response = await DummyInstance.get(`/products/${params.paths?.id}`);
      return response.data;
    },

    addNewProduct: async (
      params: TDummyServiceType.TProducts.TAddNewProduct.TRequest,
    ): Promise<TDummyServiceType.TProducts.TAddNewProduct.TResponse> => {
      const response = await DummyInstance.post(`/products/add`, params.body);
      return response.data;
    },

    updateProduct: async (
      params: TDummyServiceType.TProducts.TUpdateProduct.TRequest,
    ): Promise<TDummyServiceType.TProducts.TUpdateProduct.TResponse> => {
      const response = await DummyInstance.put(
        `/products/${params.paths?.id}`,
        params.body,
      );
      return response.data;
    },

    deleteProduct: async (
      params: TDummyServiceType.TProducts.TDeleteProduct.TRequest,
    ): Promise<TDummyServiceType.TProducts.TDeleteProduct.TResponse> => {
      const response = await DummyInstance.delete(
        `/products/${params.paths?.id}`,
      );
      return response.data;
    },
  },
};

export default DummyApi;
