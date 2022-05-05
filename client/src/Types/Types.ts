export interface ICode {
  code: string | null;
}

export interface IAutorisationAxiosResp {}

export interface IResponseBody {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ISong {
  song: string;
}

export interface APIResponse<T> {
    body: T;
    headers: Record<string, string>;
    statusCode: number;
}

export interface IReducedSongInfo {
    artist: string;
    title: string;
    uri: string;
    albumUrl: any;
}
