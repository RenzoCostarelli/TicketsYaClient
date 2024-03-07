import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: `${err.message}-${err.cause}` };
  },
});

/**
 * This is your Uploadthing file router. For more information:
 * @see https://docs.uploadthing.com/api-reference/server#file-routes
 */
export const uploadRouter = {
  profileImage: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .onUploadComplete(({ file, metadata }) => {
      metadata;
      return { file, metadata }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;