export interface BlogType {
  _id?: string;
  title?: string;
  idTitle?: string;
  content?: string;
  chapeau?: string;
  category?: string;
  images?: {
    thumbnail?: string;
  };
  author?: {
    name?: string;
    role?: string;
    date?: string;
  };
  date?: string;
}
