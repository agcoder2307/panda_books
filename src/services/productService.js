import request, { public_request } from ".";

export const productService = {
  getProducts: (params) => request({ method: "get", url: "/products", params }),
  getProductById: (id) => request({ method: "get", url: `/products/${id}` }),
  createProduct: (data) => request({ method: "post", url: "/products", data }),
  getPublicProducts: (params) =>
    public_request({ method: "get", url: "/public/products", params }),
};
