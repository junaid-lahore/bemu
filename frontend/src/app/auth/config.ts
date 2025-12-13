import { z } from "zod";

const configSchema = z.object({
  projectId: z.string().default(""),
  jwksUrl: z.string().default(""),
  publishableClientKey: z.string().default(""),
  handlerUrl: z.string().default('auth')
});

type StackAuthExtensionConfig = z.infer<typeof configSchema>;

// Helper function to get Stack Auth config from environment variables
// Uses NEXT_PUBLIC_ prefix for client-side access in Next.js
const getStackAuthConfig = (): Record<string, unknown> => {
  // Read from NEXT_PUBLIC_STACK_AUTH_CONFIG (client-side accessible)
  if (process.env.NEXT_PUBLIC_STACK_AUTH_CONFIG) {
    try {
      return JSON.parse(process.env.NEXT_PUBLIC_STACK_AUTH_CONFIG);
    } catch (err) {
      console.error("Error parsing NEXT_PUBLIC_STACK_AUTH_CONFIG", err);
    }
  }

  // Return empty object as default
  return {};
};

export const config: StackAuthExtensionConfig = configSchema.parse(
  getStackAuthConfig()
);
