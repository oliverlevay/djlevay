import { defineSchema } from "@tinacms/cli";

export default defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      format: "mdx",
      path: "content/page",
      fields: [
        { type: "string", label: "Title", name: "title" },
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
          templates: [
            {
              name: "SoundCloudPlaylist",
              label: "Sound Cloud Playlist",
              fields: [
                {
                  name: "url",
                  label: "Url",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "papers",
          label: "Papers",
          description: "Papers on the page",
          type: "object",
          list: true,
          fields: [
            {
              label: "Paper content",
              name: "paper",
              type: "rich-text",
              templates: [
                {
                  name: "SoundCloudPlaylist",
                  label: "Sound Cloud Playlist",
                  fields: [
                    {
                      name: "url",
                      label: "Url",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
});
