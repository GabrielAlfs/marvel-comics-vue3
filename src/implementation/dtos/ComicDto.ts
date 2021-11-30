import { ComicEntity } from '@/domain/entities/Comic';

type ComicImage = {
  path: string;
  extension: string;
};

type ComicPrice = {
  type: string;
  price: number;
};

type EntitySummary = {
  resourceURI: string;
  name: string;
  role: string;
};

type EntityList = {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<EntitySummary>;
};

export type ComicEntityDto = {
  id: number;
  title: string;
  description: string | null;
  thumbnail: ComicImage;
  prices: Array<ComicPrice>;
  creators: EntityList;
  characters: EntityList;
};

export class ComicDtoMapper {
  static toDomain({
    id,
    title,
    description,
    thumbnail,
    characters,
    creators,
    prices,
  }: ComicEntityDto): ComicEntity {
    return {
      id,
      title,
      description,
      imageURL: `${thumbnail.path}.${thumbnail.extension}`,
      characters: characters.items.map((character) => character.name),
      creators: creators.items.map((creator) => creator.name),
      price: prices[0].price,
    };
  }
}
