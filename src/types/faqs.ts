export interface IFaq {
  id: string;
  question: string;
  answer: string;
  type: EFAQLocation;
  category_id: string;
}
export interface Subcategory {
  subId: string;
  subTitle: string;
}
export interface FaqsCategory {
  title?: string;
  subcategories: string[];
}

export interface Section {
  title: string;
  content: string;
}

export interface ContentData {
  [key: string]: {
    title: string;
    sections: Section[];
    tableOfContents: string[];
  };
}

export interface FaqsDataStructure {
  categories: FaqsCategory[];
  content: ContentData;
}

export enum EFAQLocation {
  FAQ_TYPE_UNSPECIFIED,
  FAQ_TYPE_PRICING,
  FAQ_TYPE_SOLUTION,
  FAQ_TYPE_DEVELOPER,
}
