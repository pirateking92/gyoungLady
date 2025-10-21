import { defineField, defineType } from "sanity";

export default defineType({
  name: "cv",
  title: "CV / Resume",
  type: "document",
  fields: [
    defineField({
      name: "cvFile",
      title: "CV File",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
      validation: (Rule) => Rule.required(),
      description: "Upload your CV/Resume (PDF recommended)",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
      description: "When was this CV last updated?",
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: 'Optional version number (e.g., "v2.0" or "2024 Q4")',
    }),
  ],
  preview: {
    select: {
      date: "lastUpdated",
      version: "version",
    },
    prepare(selection) {
      const { date, version } = selection;
      return {
        title: "CV / Resume",
        subtitle: version
          ? `Version ${version} - Updated ${date}`
          : `Updated ${date}`,
      };
    },
  },
});
