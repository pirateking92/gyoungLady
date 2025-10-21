import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt: string;
  caption?: string;
}

export interface SanityFile {
  asset: {
    _id: string;
    url: string;
    originalFilename: string;
    size: number;
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImage;
  gallery?: SanityImage[];
  projectDate?: string;
  client?: string;
  description: PortableTextBlock[];
  materials?: string[];
  techniques?: string[];
  beforeAfter?: {
    before?: SanityImage;
    after?: SanityImage;
  };
  featured: boolean;
  excerpt?: string;
}

export interface Credential {
  title: string;
  institution: string;
  year: string;
  description?: string;
}

export interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface About {
  name: string;
  profilePhoto?: SanityImage;
  bio: PortableTextBlock[];
  credentials?: Credential[];
  specializations?: string[];
  email: string;
  phone?: string;
  socialLinks?: SocialLinks;
}

export interface HomepageData {
  name: string;
  tagline?: string;
  profilePhoto?: SanityImage;
  email: string;
  socialLinks?: SocialLinks;
}

export interface CV {
  cvFile: SanityFile;
  lastUpdated: string;
  version?: string;
}

export interface SiteSettings {
  name: string;
  email: string;
  socialLinks?: SocialLinks;
  siteTitle: string;
  siteDescription: string;
}
