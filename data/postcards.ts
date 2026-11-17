export type PostcardAlbum = {
  id: string;
  month: string;
  title: string;
  photos: number;
  image?: string;
  theme: string;
};

export const postcardAlbums: PostcardAlbum[] = [
  { id: "album-1", month: "November 2026", title: "Postcard album 01", photos: 0, theme: "linear-gradient(145deg, #201548, #5946a0 55%, #c77d9b)" },
  { id: "album-2", month: "October 2026", title: "Postcard album 02", photos: 0, theme: "linear-gradient(145deg, #102d39, #267d82 55%, #c2a56d)" },
  { id: "album-3", month: "September 2026", title: "Postcard album 03", photos: 0, theme: "linear-gradient(145deg, #39211f, #a15a4a 55%, #e0ad72)" },
];
