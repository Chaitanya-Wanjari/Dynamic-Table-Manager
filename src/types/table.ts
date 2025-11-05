export type TableRow = {
  id: string;
  name?: string;
  email?: string;
  age?: number | string;
  role?: string;
  [key: string]: any;
};
