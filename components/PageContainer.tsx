export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-5xl ">{children}</div>;
}
