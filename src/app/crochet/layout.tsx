import QueryProvider from "./(providers)/QueryProvider";

export default function CrochetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}

