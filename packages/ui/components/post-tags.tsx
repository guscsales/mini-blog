import { Tag } from "./tag";

/** Tags do rodapé do post: a primeira é a categoria, sólida; as demais, contornadas. */
export function PostTags({ tags }: { tags: string[] }) {
  const [primary, ...rest] = tags;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {primary ? <Tag>{primary}</Tag> : null}
      {rest.map((tag) => (
        <Tag key={tag} variant="outline">
          {tag}
        </Tag>
      ))}
    </div>
  );
}
