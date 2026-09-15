import type { TagFilter } from "../../factories/models/post";

/** Atalhos de filtro por tag. O ativo vem preenchido, os outros contornados. */
export function TagFilters({ tags }: { tags: TagFilter[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a
          key={tag.label}
          href="#"
          aria-current={tag.active ? "true" : undefined}
          className={`rounded-xs px-[10px] py-[5px] font-mono text-xs leading-4 ${
            tag.active
              ? "bg-accent-dim font-medium text-accent"
              : "border border-border-strong text-text-muted"
          }`}
        >
          {tag.label}
        </a>
      ))}
    </div>
  );
}
