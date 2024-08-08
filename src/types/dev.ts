export interface Subcategory {
  subId: string;
  subTitle: string;
}

export interface DevCategory {
  title?: string;
  subcategories: Subcategory[];
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

export interface DevDataStructure {
  categories: DevCategory[];
  content: ContentData;
}
