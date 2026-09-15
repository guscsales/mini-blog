import { Button } from "./button";
import { Input } from "./input";

/** Chamada de assinatura, na faixa de superfície antes do rodapé. */
export function NewsletterForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="flex flex-col gap-5 border-t border-border bg-surface px-5 pt-9 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[28px] leading-[114%] tracking-tight text-text">
          {title}
        </h2>
        <p className="font-sans text-sm leading-[22px] text-text-muted">{description}</p>
      </div>
      <form className="flex flex-col gap-[10px]">
        <Input type="email" name="email" label="Seu e-mail" placeholder="voce@email.com" />
        <Button type="submit">Assinar</Button>
      </form>
    </section>
  );
}
