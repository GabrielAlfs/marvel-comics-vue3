export type ComicPreview = {
  id: number;
  title: string;
  price: number;
};

/**
 * @type {ComicEntity} - Entidade de Quadrinhos
 */
export interface ComicEntity extends ComicPreview {
  description: string | null;
  imageURL: string;
  creators: Array<string>;
  characters: Array<string>;
}
