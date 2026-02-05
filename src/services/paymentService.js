import request from ".";

export const paymentService = {
  paymePurchase: (orderId) =>
    request({ method: "get", url: `/payme/${orderId}` }),
};
