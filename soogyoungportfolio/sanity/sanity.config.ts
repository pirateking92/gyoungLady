import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Art Conservator Portfolio",

  projectId: "qp9f2hxj",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Projects - regular document list
            S.listItem()
              .title("Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("Projects")),

            // About - singleton
            S.listItem()
              .title("About")
              .child(S.document().schemaType("about").documentId("about")),

            // CV - singleton
            S.listItem()
              .title("CV / Resume")
              .child(S.document().schemaType("cv").documentId("cv")),
          ]),
    }),
    visionTool(),
  ],

  schema,
});
