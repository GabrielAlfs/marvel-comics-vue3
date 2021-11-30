import { GetComicsListUseCase } from '@/domain/usecases/GetComicsListUseCase';
import { GetComicsListService } from '@/implementation/services/GetComicsListService';
import { buildAxiosHttpClient } from '../http/AxiosHttpClient';

export const buildGetComicsListUseCase = (): GetComicsListUseCase =>
  new GetComicsListService('/comics', buildAxiosHttpClient());
