import { Button } from "./button";
import { Container } from "./container";
import { Input } from "./input";

/**
 * Chamada de assinatura. Empilhada no mobile; a partir de `lg` o texto fica à
 * esquerda e o formulário à direita, na mesma linha.
 */
export function NewsletterForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-5 pt-9 pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-[72px]">
        <div className="flex flex-col gap-2 lg:grow">
          <h2 className="font-display text-[28px] leading-[114%] tracking-tight text-text lg:text-[34px]">
            {title}
          </h2>
          <p className="font-sans text-sm leading-[22px] text-text-muted lg:text-[15px] lg:leading-6">
            {description}
          </p>
        </div>
        <form className="flex flex-col gap-[10px] lg:shrink-0 lg:flex-row lg:items-center lg:gap-3">
          <Input
            type="email"
            name="email"
            label="Seu e-mail"
            placeholder="voce@email.com"
            className="lg:w-[280px]"
          />
          <Button type="submit">Assinar</Button>
        </form>
      </Container>
    </section>
  );
}
