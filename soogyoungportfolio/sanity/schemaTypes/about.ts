import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Professional name as it should appear on the site",
    }),
    defineField({
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        },
      ],
      description: "Professional headshot",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Your professional biography",
    }),
    defineField({
      name: "credentials",
      title: "Education & Credentials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Degree/Credential",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'e.g., "MA in Art Conservation"',
            },
            {
              name: "institution",
              title: "Institution",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'e.g., "NYU Institute of Fine Arts"',
            },
            {
              name: "year",
              title: "Year",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'e.g., "2018" or "2015-2017"',
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "Optional additional details",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "institution",
              year: "year",
            },
            prepare(selection) {
              const { title, subtitle, year } = selection;
              return {
                title: title,
                subtitle: `${subtitle} - ${year}`,
              };
            },
          },
        },
      ],
      description: "Your educational background and certifications",
    }),
    defineField({
      name: "specializations",
      title: "Specializations",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Areas of expertise (e.g., "Oil Paintings", "Paper Conservation")',
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      description: "Professional contact email",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Optional contact phone number",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        },
        {
          name: "twitter",
          title: "Twitter/X",
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        },
        {
          name: "website",
          title: "Personal Website",
          type: "url",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        },
      ],
      description: "Optional social media profiles",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "profilePhoto",
    },
  },
});
