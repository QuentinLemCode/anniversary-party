type Album = 'album';
type Artist = 'artist';
type Playlist = 'playlist';
type Track = 'track';
type Show = 'show';
type Episode = 'episode';

export type SpotifyAlbumCategory = Album;
export type SpotifyArtistCategory = Artist;
export type SpotifyPlaylistCategory = Playlist;
export type SpotifyTrackCategory = Track;
export type SpotifyShowCategory = Show;
export type SpotifyEpisodeCategory = Episode;

export type SpotifyCategoryID =
  | Album
  | Artist
  | Playlist
  | Track
  | Show
  | Episode;

type SpotifyID = string;

export type SpotifyURI<T extends SpotifyCategoryID = SpotifyCategoryID> =
  `spotify:${T}:${SpotifyID}`;

export interface QueueMusic {
  uri: SpotifyURI<SpotifyTrackCategory>;
}

export interface Music {
  artist: string;
  title: string;
  album: string;
  uri: SpotifyURI<Track>;
  cover: string;
}
