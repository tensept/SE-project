// types.ts
export interface PageContent {
    title: string;
    icon: string;
    subtitle: string;
    content: string;
    date: string;
    pageNumber: number;
  }
  
  export interface PageProps {
    content: PageContent;
    isActive: boolean;
    style?: React.CSSProperties;
    className?: string;
  }