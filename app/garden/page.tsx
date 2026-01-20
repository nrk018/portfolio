import Navigation from "@/components/Navigation";
import Link from "next/link";

const notes = [
  {
    id: "note-one",
    title: "On Minimalism in Design",
  },
  {
    id: "note-two",
    title: "Typography as Interface",
  },
  {
    id: "note-three",
    title: "The Value of Restraint",
  },
  {
    id: "note-four",
    title: "Reading and Thinking",
  },
];

export default function Garden() {
  return (
    <>
      <Navigation />
      <main style={{
        minHeight: "100vh",
        padding: "8rem 3rem 6rem",
        maxWidth: "700px",
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginBottom: "4rem",
        }}>
          2nd BRAIN
        </h1>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}>
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/garden/${note.id}`}
              style={{
                fontSize: "1rem",
                textDecoration: "none",
                borderBottom: "1px solid #000",
                paddingBottom: "2px",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              {note.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

