/** Iniciais de um nome completo, em minúsculas — usadas no avatar do autor. */
export function getInitials(fullName: string): string {
  const [first, second] = fullName.trim().split(/\s+/);
  return `${first?.[0] ?? ""}${second?.[0] ?? ""}`.toLowerCase();
}
