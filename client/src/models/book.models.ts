export type BookShelfKeys = 'Read' | 'Reading' | 'Want To Read' | 'None';
export type BookShelfValues = 'read' | 'currentlyReading' | 'wantToRead' | 'None';

export type BookShelfType = Readonly<{ [key in BookShelfKeys]: BookShelfValues }>;

export type UpdateStatusType = ({ book, shelf }: { book: Book; shelf: BookShelfValues }) => void;

export type Book = {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printType: string;
  categories: 'COMPUTERS'[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  id: string;
  shelf: BookShelfValues;
};
