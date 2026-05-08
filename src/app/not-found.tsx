import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ margin: "0 0 12px", fontSize: "32px" }}>Page not found</h1>
        <p style={{ margin: "0 0 16px", opacity: 0.8 }}>
          The page you are looking for does not exist.
        </p>
        <Link href="/">Go back home</Link>
      </div>
    </main>
  );
}
