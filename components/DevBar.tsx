export default function DevBar() {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white rounded-full px-4 py-2 text-sm shadow-lg">
      <a className="mr-3 underline" href="/">Home</a>
      <a className="mr-3 underline" href="/contact">Contact</a>
      <a className="mr-3 underline" href="/get-involved">Get Involved</a>
      <a className="underline" href="/services">Services</a>
    </div>
  );
}
