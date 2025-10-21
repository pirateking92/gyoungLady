import { groq } from "next-sanity";

/**
 * Get homepage data including hero section and brief intro
 */
export const getHomepageDataQuery = groq`
  *[_type == "about"][0] {
    name,
    "tagline": bio[0].children[0].text,
    profilePhoto {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    email,
    socialLinks
  }
`;

/**
 * Get complete about page data
 */
export const getAboutPageQuery = groq`
  *[_type == "about"][0] {
    name,
    profilePhoto {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    bio,
    credentials[] {
      title,
      institution,
      year,
      description
    },
    specializations,
    email,
    phone,
    socialLinks {
      linkedin,
      instagram,
      twitter,
      website
    }
  }
`;

/**
 * Get CV file download information
 */
export const getCVFileQuery = groq`
  *[_type == "cv"][0] {
    cvFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size
      }
    },
    lastUpdated,
    version
  }
`;

/**
 * Get all projects with basic information
 * Sorted by project date (newest first)
 */
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(projectDate desc) {
    _id,
    title,
    slug,
    mainImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      caption
    },
    projectDate,
    client,
    "excerpt": array::join(string::split((pt::text(description)), "")[0..150], "") + "...",
    featured
  }
`;

/**
 * Get a single project by slug with full details
 */
export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      caption
    },
    gallery[] {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      caption
    },
    projectDate,
    client,
    description,
    materials,
    techniques,
    beforeAfter {
      before {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      },
      after {
        asset-> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      }
    },
    featured
  }
`;

/**
 * Get featured projects for homepage
 * Limited to 6 most recent featured projects
 */
export const getFeaturedProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(projectDate desc) [0...6] {
    _id,
    title,
    slug,
    mainImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      caption
    },
    projectDate,
    client,
    "excerpt": array::join(string::split((pt::text(description)), "")[0..100], "") + "..."
  }
`;

/**
 * Get site settings including SEO and global configuration
 * Note: This queries the about page for now since we don't have a separate settings document
 * If you want dedicated site settings, create a new schema type
 */
export const getSiteSettingsQuery = groq`
  *[_type == "about"][0] {
    name,
    email,
    socialLinks {
      linkedin,
      instagram,
      twitter,
      website
    },
    "siteTitle": name + " - Art Conservation",
    "siteDescription": bio[0].children[0].text
  }
`;
