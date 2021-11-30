type ComicImage = {
  path: string;
  extension: string;
};

type ComicPrice = {
  type: string;
  price: number;
};

export type Comic = {
  id: number;
  title: string;
  description: string | null;
  thumbnail: ComicImage;
  prices: Array<ComicPrice>;
};
