import ContentCard from "./ContentCard";
import EmptyContentState from "./EmptyContentState";

export default function ContentGrid({ items, viewMode, onUpload }) {
  if (items.length === 0) {
    return <EmptyContentState onUpload={onUpload} />;
  }

  return (
    <div
      className={
        viewMode === "Lista"
          ? "flex flex-col gap-4"
          : "grid gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
      }
    >
      {items.map((item) => (
        <ContentCard key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  );
}
