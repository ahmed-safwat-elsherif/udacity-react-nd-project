export const Endpoints = {
  User: {
    CreateAccount: '/user/create',
    Login: '/user/login',
    UserInfo: '/user/info',
  },
  Books: {
    GetBookById: (bookId: string) => `/books/${bookId}`,
    GetAllBooks: `/books`,
    updateBookShelf: (bookId: string) => `/books/${bookId}`,
    Search: `/search`,
  },
};
