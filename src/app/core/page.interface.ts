export interface Page {
  info: PageInfo;
  layout: Layout[];
}

export interface PageInfo {
  name: string;
  desc: string;
}

export interface Layout {
  layout?: Layout[];
  widget?: Widget;
  classs?: string[];
  styles?: Style;
  type: string;
}

export interface Style {
  [propName: string]: string;
}

export interface Widget {
  properties: PropSchema;
}

export interface PropSchema {
  [propName: string]: string;
}

export interface FormSchema {}
