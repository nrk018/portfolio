import Navigation from "@/components/Navigation";
import Link from "next/link";

interface NotePageProps {
  params: {
    slug: string;
  };
}

export default function NotePage({ params }: NotePageProps) {
  const title = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Navigation />
      <main style={{
        minHeight: "100vh",
        padding: "8rem 3rem 6rem",
        maxWidth: "700px",
        margin: "0 auto",
      }}>
        <Link href="/garden" style={{
          fontSize: "0.875rem",
          textDecoration: "none",
          borderBottom: "1px solid #000",
          paddingBottom: "2px",
          marginBottom: "3rem",
          display: "inline-block",
        }}>
          ← Back to 2nd BRAIN
        </Link>

        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "3rem",
          marginTop: "2rem",
        }}>
          {title}
        </h1>

        <div style={{
          fontSize: "1rem",
          lineHeight: 1.8,
        }}>
          <p style={{
            marginBottom: "1.5rem",
          }}>
            This is a place for short writing, thoughts, and notes. The text should be light, honest, and arranged with breathing room.
          </p>
          <p style={{
            marginBottom: "1.5rem",
          }}>
            Add your thoughts here. Each paragraph should have space to breathe, creating a calm reading experience.
          </p>
          <p style={{
            marginBottom: "1.5rem",
          }}>
            Continue your writing, maintaining the same quiet, intentional tone throughout.
          </p>
        </div>
      </main>
    </>
  );
}

