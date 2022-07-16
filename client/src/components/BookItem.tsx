import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookShelfEnum } from '../enums/book-status.enum';
import { Book, BookShelfValues, UpdateStatusType } from '../models/book.models';

export const BookItem = ({
  book: { shelf, ...bookInfo },
  onChangeStatus,
}: {
  book: Book;
  onChangeStatus: UpdateStatusType;
}) => {
  const selectOptions = useMemo(() => {
    return Object.entries(BookShelfEnum).map(([key, value]) => (
      <option value={value} key={key} disabled={value === shelf}>
        {key} {value === shelf && '(active)'}
      </option>
    ));
  }, [shelf]);
  return (
    <div className="relative">
      <Link to={`/book/${bookInfo.id}`} className="relative">
        {!bookInfo.imageLinks?.smallThumbnail && !bookInfo.imageLinks?.thumbnail && (
          <div className="absolute top-0 flex w-[100%] justify-center bg-slate-900 bg-opacity-60 ">
            <span className="inline-block text-center italic">
              No Image available for this book
            </span>
          </div>
        )}
        <img
          src={bookInfo.imageLinks?.smallThumbnail || bookInfo.imageLinks?.thumbnail || ''}
          onError={e => {
            e.currentTarget.src = '/image-thumbnail.jpg';
          }}
          alt={bookInfo.title}
          width="100%"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-col">
        <p className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-[1.2rem]">
          {bookInfo.title}
        </p>
        <p className="max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap text-[0.8rem] italic text-gray-100">
          {!bookInfo.authors?.length
            ? 'Unknown'
            : bookInfo.authors?.length === 1
            ? 'by: ' + bookInfo?.authors[0]
            : 'by: ' + bookInfo?.authors[0] + ' and others'}
        </p>
      </div>
      <div className="absolute bottom-10 -right-5 h-[3rem] w-[3rem] rounded-full bg-teal-800 hover:shadow-md hover:shadow-black">
        <select
          value={shelf}
          onChange={e =>
            onChangeStatus({
              book: { ...bookInfo, shelf },
              shelf: e.target.value as BookShelfValues,
            })
          }
          className="h-[100%] w-[100%] cursor-pointer opacity-0"
        >
          <option value="none" disabled>
            Choose ..
          </option>
          {selectOptions}
        </select>
      </div>
    </div>
  );
};
