import request from ".";

export const cartService = {
  getCarts: (params) => request({ method: "get", url: "/carts", params }),
  addToCart: (data) => request({ method: "put", url: "/carts/add-item", data }),
  removeItemFromCart: (data) =>
    request({ method: "put", url: "/carts/remove-item", data }),
};
