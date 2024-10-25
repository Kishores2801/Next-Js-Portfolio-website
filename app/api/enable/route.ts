// ./src/app/api/draft-mode/enable/route.ts

import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

// Sanity client with a token for preview access
const clientWithToken = client.withConfig({ token });

export async function GET(request: NextRequest) {
  // Ensure the API token is set correctly
  if (!process.env.SANITY_API_READ_TOKEN) {
    return new Response("Missing environment variable: SANITY_API_READ_TOKEN", {
      status: 500,
    });
  }

  // Validate the preview URL with the provided client and request URL
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  // Handle invalid preview secret
  if (!isValid) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  // Enable draft mode
  draftMode().enable();

  // Redirect to the intended page or homepage if not specified
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
