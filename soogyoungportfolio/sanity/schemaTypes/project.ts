import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Name of the conservation project",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "Auto-generated URL-friendly identifier",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for accessibility and SEO",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional image caption",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        {
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
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      description: "Additional images showing project details, process, etc.",
    }),
    defineField({
      name: "projectDate",
      title: "Project Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      description: "When the project was completed",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: 'Client name or "Private Collection" if confidential',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Detailed description of the conservation work",
    }),
    defineField({
      name: "materials",
      title: "Materials Used",
      type: "array",
      of: [{ type: "string" }],
      description: "List of materials used in the conservation process",
    }),
    defineField({
      name: "techniques",
      title: "Techniques",
      type: "array",
      of: [{ type: "string" }],
      description: "Conservation techniques applied",
    }),
    defineField({
      name: "beforeAfter",
      title: "Before & After Images",
      type: "object",
      fields: [
        {
          name: "before",
          title: "Before Image",
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
        },
        {
          name: "after",
          title: "After Image",
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
        },
      ],
      description: "Optional before/after comparison images",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Highlight this project on the homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      date: "projectDate",
    },
    prepare(selection) {
      const { title, media, date } = selection;
      return {
        title: title,
        media: media,
        subtitle: date ? new Date(date).getFullYear().toString() : "No date",
      };
    },
  },
});
