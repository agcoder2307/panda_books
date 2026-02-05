import request from ".";

export const orderService = {
  createOrder: (data) => request({ method: "post", url: "/orders", data }),
  history: (params) =>
    request({ method: "get", url: "/orders/history", params }),
};
