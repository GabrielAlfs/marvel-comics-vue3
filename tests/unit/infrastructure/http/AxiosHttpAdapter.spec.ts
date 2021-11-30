import axios from 'axios';
import { AxiosHttpAdapter } from '@/infrastructure/http/AxiosHttpAdapter';
import { HttpClientArgs } from '@/implementation/common/HttpClient';

jest.mock('axios');

const mockRequestPayload: HttpClientArgs = {
  method: 'GET',
  url: '/',
  body: { any: 'any' },
  headers: { any: 'any' },
  query: { any: 'any' },
};

const mockedAxios = axios as jest.Mocked<typeof axios>;

const buildSut = (): AxiosHttpAdapter => new AxiosHttpAdapter(mockedAxios);

describe('AxiosHttpAdapter', () => {
  it('should call get method with the correct payload', async () => {
    const sut = buildSut();

    mockedAxios.request.mockResolvedValueOnce({ data: {} });

    await sut.request(mockRequestPayload);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      method: mockRequestPayload.method,
      url: mockRequestPayload.url,
      data: mockRequestPayload.body,
      headers: mockRequestPayload.headers,
      params: { ...mockRequestPayload.query },
    });
  });
});
