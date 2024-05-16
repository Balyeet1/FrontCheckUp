export type User = {
  id: string;
  name: string;
  email: string;
};

export interface Blog {
  id?: number;
  title: string;
  image: string;
  content: string;
}