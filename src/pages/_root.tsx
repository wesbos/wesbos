export default async function RootElement({ children }) {
  return (
    <html lang="en">
      <head />
      <body data-version="1.0">{children}</body>
    </html>
  );
}
