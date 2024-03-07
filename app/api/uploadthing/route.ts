import { createRouteHandler } from "uploadthing/next";

import { uploadRouter } from "./core";
import { UTApi } from "uploadthing/server";

export const runtime = "nodejs";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});

export async function DELETE(request: Request) {
  const data = await request.json();
  const newUrl = data.substring(data.lastIndexOf("/") + 1);
  const utapi = new UTApi();
  await utapi.deleteFiles(newUrl);

  return Response.json({ message: "ok" });
}