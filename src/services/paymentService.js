import request from ".";

export const paymentService = {
  paymePurchase: (orderId) =>
    request({ method: "get", url: `/payme/${orderId}` }),
  clickPurchase: (orderId) =>
    request({ method: "get", url: `/click/${orderId}` }),
  uzumPurchase: (orderId) =>
    request({ method: "get", url: `/uzum/checkout/${orderId}` }),
};
