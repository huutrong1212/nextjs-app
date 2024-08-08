import { ContentType, ELocation } from './common';

export enum PostState {
  POST_STATE_UNSPECIFIED = 0,
  POST_STATE_PUBLIC = 1,
  POST_STATE_DRAFT = 3,
  POST_STATE_DELETED = 4,
}
export interface IPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  thumbnail: string;
  state: number;
  created_date: string;
  last_modified_date: string;
  category: object;
  tags: any[];
  created_by: object;
  featured: boolean;
  linkText?: string;
  timeToRead?: string;
  pdf?: string;
  content_type: ContentType;
  location: ELocation;
}

export type TPostFilter = {
  name: string;
  state: string | null;
  category_id: string | null;
};

export interface IParams {
  [key: string]: string | number | boolean | undefined;
}
