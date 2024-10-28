const ContentTop = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex justify-between gap-4 flex-wrap mb-5">{children}</div>;
};

export default ContentTop;
