import request from ".";

export const orderService = {
  createOrder: (data) => request({ method: "post", url: "/orders", data }),
  register: (params) =>
    request({ method: "post", url: "/orders/history", params }),
};
