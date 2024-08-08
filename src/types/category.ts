export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  state: number;
  created_date: string;
  last_modified_date: string;
  no_of_posts: number;
  parent_id: string;
  thumbnail: string;
  children: any[];
  location: number;
  created_by: null | string;
  parent: null | ICategory;
  is_system: boolean;
  display_order: number;
  for_developers: boolean;
}
