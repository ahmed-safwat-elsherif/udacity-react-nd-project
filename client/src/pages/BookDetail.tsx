import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { useBookDetails } from '../hooks/useBookDetails';
import { Book } from '../models/book.models';

export const BookDetail = () => {
  let { id: bookId } = useParams();
  const { book, error, loading } = useBookDetails({
    bookId: bookId as string,
  });
  const [expandText, setExpandText] = useState(false);

  if (error) return <Navigate to="/notfound" />;

  if (loading) return <Loading />;
  const { title, imageLinks, authors, description, previewLink } = book as Book;
  return (
    <div className="relative">
      <div className="mx-5 mt-10 mb-10 flex h-[100%] flex-col items-stretch sm:flex-row md:mx-[5rem]">
        <h3 className="text-bold mb-5 block text-[2rem] sm:hidden">"{title}"</h3>
        <div className="top-0 mb-4 flex flex-1 flex-col items-start justify-center sm:justify-start">
          <img
            src={imageLinks.thumbnail || imageLinks.smallThumbnail}
            onError={e => {
              e.currentTarget.src = '/image-thumbnail.jpg';
            }}
            alt={title}
            width="60%"
            className="min-w-[15rem]"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-bold hidden text-[2rem] sm:block">{title}</h3>
          <hr />
          <h4 className="text-end text-[1.2rem] italic text-gray-300">
            {!authors.length
              ? 'Unknown'
              : authors.length === 1
              ? 'by: ' + authors[0]
              : 'Authors: ' +
                authors.map((author, idx, items) =>
                  idx < items.length - 1 ? author + ', ' : 'and ' + author
                )}
          </h4>
          <p className="mt-4 uppercase underline">Short description:</p>
          <p className="text-justify italic text-slate-400">
            {description.substring(0, !expandText ? 300 : description.length)}
            {description.length > 300 && (
              <>
                {!expandText && '... '}
                <button
                  className=" text-white hover:underline"
                  onClick={() => setExpandText(prev => !prev)}
                >
                  {!expandText ? 'See More' : '(Show Less)'}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-auto mx-auto mt-10 flex w-[100%] flex-1 justify-center px-10 sm:left-[20%] sm:w-[60%]">
        <a
          href={previewLink}
          target="__blank"
          className="btn btn-secondary mt-3 flex-1 rounded-md rounded-bl-none rounded-br-none"
        >
          preview it
        </a>
      </div>
    </div>
  );
};
