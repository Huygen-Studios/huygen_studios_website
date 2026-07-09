<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Custom Rules

- **Resource Links**: Whenever the user adds a link regarding resources (e.g. UI components, external references), simply add the link as a new card in the Globe component (`GallerySection.tsx` which uses `projects-data.ts`). Do NOT implement or copy the entire component/resource code into the project unless explicitly requested. Only display the card.
- **Product Links**: Whenever the user provides a name and a link for a "product", replace the existing card in the Products section (`HuygenProducts.tsx`) with the new product card and its link. Do NOT generate extra cards or dummy images; keep it to only the specific card requested.
