import request from ".";

export const authService = {
  login: (data) => request({ method: "post", url: "/auth/login", data }),
  register: (data) => request({ method: "post", url: "/auth/register", data }),
};
