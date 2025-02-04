export type Preference = {
  genre?: string;
  themes?: string[];
  character_traits?: string[];
  time_period?: string;
}

export type Book = {
  authors: string[];
  description: string;
  link: string;
  thumbnail: string | null;
  title: string;
}

export type GoogleBooksAPIResponse = {
  items?: {
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: { thumbnail?: string };
      infoLink: string;
    };
  }[];
}
