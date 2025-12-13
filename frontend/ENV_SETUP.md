# Environment Variables Setup

## Stack Auth Configuration

To configure Stack Auth, set the `NEXT_PUBLIC_STACK_AUTH_CONFIG` environment variable in your `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_STACK_AUTH_CONFIG='{"projectId":"your-project-id","publishableClientKey":"your-key","jwksUrl":"","handlerUrl":"auth"}'
```

### If using DATABUTTON_EXTENSIONS

If you're using the `DATABUTTON_EXTENSIONS` format, extract the stack-auth config and set it as `NEXT_PUBLIC_STACK_AUTH_CONFIG`:

```bash
# Example: If DATABUTTON_EXTENSIONS contains:
# [{"name":"stack-auth","config":{"projectId":"xxx","publishableClientKey":"yyy"}}]

# Extract and set:
NEXT_PUBLIC_STACK_AUTH_CONFIG='{"projectId":"xxx","publishableClientKey":"yyy","jwksUrl":"","handlerUrl":"auth"}'
```

**Note:** The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js.

