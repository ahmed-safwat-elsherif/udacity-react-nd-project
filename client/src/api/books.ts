import axiosBase, { AxiosResponse } from 'axios';
import { TOKEN } from '../contexts/AuthContext';
import { Book, BookShelfValues } from '../models/book.models';
import { Endpoints } from './config';

const BookBaseUrl = 'https://reactnd-books-api.udacity.com';

const token = localStorage.getItem(TOKEN);

const headers: HeadersInit = {
  Accept: 'application/json',
  Authorization: token as string,
};

const axios = axiosBase.create({
  baseURL: BookBaseUrl,
  headers,
});

//-----------------------------------------------------------------------------------//
//----------------------------------- API Helpers -----------------------------------//
//-----------------------------------------------------------------------------------//

export const getBookById = ({ bookId }: { bookId: string }) =>
  axios.get<any, AxiosResponse<{ book: Book }>>(Endpoints.Books.GetBookById(bookId), {
    headers,
  });

export const getAllBooks = () => axios.get(Endpoints.Books.GetAllBooks, { headers });

export const updateBookShelf = ({ bookId, shelf }: { bookId: string; shelf: BookShelfValues }) =>
  axios.put(
    Endpoints.Books.updateBookShelf(bookId),
    {
      shelf,
    },
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }
  );

type SearchBooksResponse = {
  books: {
    error: string;
    items: Book[];
  } & Book[];
};

export const searchBooks = ({ query, maxResults }: { query: string; maxResults: number }) =>
  axios.post<any, AxiosResponse<SearchBooksResponse>>(
    Endpoints.Books.Search,
    {
      query,
      maxResults,
    },
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }
  );
