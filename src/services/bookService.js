import request from ".";

export const bookService = {
  createBook: (data) => request({ method: "post", url: "/books", data }),
  getBooks: (params) => request({ method: "get", url: "/books", params }),
  getBookById: (id, params) =>
    request({ method: "get", url: `/books/${id}`, params }),
};
