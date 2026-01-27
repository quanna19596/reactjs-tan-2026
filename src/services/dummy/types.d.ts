import type { TCommonService } from "@/services/types";

export namespace TDummyServiceType {
  export namespace TCommon {
    export type TRequest<
      TPaths = {},
      TQueries = {},
      TBody = {},
    > = TCommonService.TRequest<TPaths, TQueries, TBody>;

    export type TResponse<T = {}> = TCommonService.TResponse<T>;
  }

  export namespace TModel {
    export type TUser = {
      id?: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      image: string;
    };

    export type TProduct = {
      id?: number;
      title: string;
      description: string;
    };
  }

  export namespace TAuth {
    export namespace TLogin {
      export type TPaths = {};
      export type TQueries = {};
      export type TBody = {
        username: string;
        password: string;
      };
      export type TRequest = TCommon.TRequest<TPaths, TQueries, TBody>;
      export type TResponse = TCommon.TResponse<
        TModel.TUser & {
          accessToken: string;
          refreshToken: string;
        }
      >;
    }
  }

  export namespace TProducts {
    export namespace TGetAllProducts {
      export type TPaths = {};
      export type TQueries = {
        limit: number;
        skip: number;
      };
      export type TBody = {};
      export type TRequest = TCommon.TRequest<TPaths, TQueries, TBody>;
      export type TResponse = TCommon.TResponse<TModel.TProduct[]>;
    }

    export namespace TGetSingleProduct {
      export type TPaths = {
        id: number;
      };
      export type TQueries = {};
      export type TBody = {};
      export type TRequest = TCommon.TRequest<TPaths, TQueries, TBody>;
      export type TResponse = TCommon.TResponse<TModel.TProduct>;
    }

    export namespace TAddNewProduct {
      export type TPaths = {};
      export type TQueries = {};
      export type TBody = {
        title: string;
      };
      export type TRequest = TCommon.TRequest<TPaths, TQueries, TBody>;
      export type TResponse = TCommon.TResponse<{}>;
    }

    export namespace TUpdateProduct {
      export type TPaths = {
        id: number;
      };
      export type TQueries = {};
      export type TBody = {
        title: string;
      };
      export type TRequest = TCommon.TRequest<TPaths, TQueries, TBody>;
      export type TResponse = TCommon.TResponse<{}>;
    }

    export namespace TDeleteProduct {
      export type TPaths = {
        id: number;
      };
      export type TQueries = {};
      export type TBody = {};
      export type TRequest = TCommon.TRequest<TPaths, TQueries, TBody>;
      export type TResponse = TCommon.TResponse<{}>;
    }
  }
}
