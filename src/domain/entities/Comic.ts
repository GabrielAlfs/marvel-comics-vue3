export type ComicPreview = {
  id: number;
  title: string;
  price: number;
};

export interface ComicEntity extends ComicPreview {
  description: string | null;
  imageURL: string;
  creators: Array<string>;
  characters: Array<string>;
}
