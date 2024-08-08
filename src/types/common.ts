export enum ESubmissionType {
  SUBSCRIBE_US = 1,
  CONTACT_US = 2,
  DOWNLOAD_MATERIALS = 3,
}

export enum CodeType {
  CODE_SUCCESS = 1,
  CODE_ERROR = 0,
  CODE_WARNING = 'CODE_WARNING',
  CODE_INFO = 'CODE_INFO',
}

export enum EState {
  UNRECOGNIZED = -1,
  STATE_UNSPECIFIED = 0,
  STATE_HIDDEN = 1,
  STATE_PUBLIC = 2,
  STATE_DELETE = 3,
}

export enum ELocation {
  EVENT_LOCATION_UNSPECIFIED = 0,
  EVENT_LOCATION_EBOOKS_INSIGHTS = 1,
  EVENT_LOCATION_CUSTOMER_STORIES = 2,
  EVENT_LOCATION_WEBINARS_VIDEOS = 3,
  EVENT_LOCATION_PRODUCT_GUIDES = 4,
}

export enum ContentType {
  CONTENT_TYPE_UNSPECIFIED = 0,
  CONTENT_TYPE_PDF = 1,
  CONTENT_TYPE_STORY = 2,
  CONTENT_TYPE_EBOOK = 3,
  CONTENT_TYPE_VIDEO = 4,
}

export interface ApiResponse {
  code: CodeType;
  message: string;
  error: {
    code: number;
    message: string;
    details: {
      key: string;
      message: string;
    }[];
  };
}

export interface ResCountryType {
  country_id: string;
  description: string;
  name: string;
  type: number;
  phone_code: string;
}

export type ResCountry = {
  data: ResCountryType[];
};

export enum FIELD_KEY {
  firstname = 'firstname',
  lastname = 'lastname',
  phone = 'phone',
  phone_code = 'phone_code',
}
