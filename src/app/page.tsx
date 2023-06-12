import NotionRequirements from "@/components/ask-notion-requirements";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl mb-5">Notion To MD Converter Online - Free</h1>
        <NotionRequirements />
        <footer className="bg-gray-900 text-white text-center py-4 mt-6">
          <p>Developed by Mahesh Muttinti</p>
        </footer>
      </div>
    </main>
  );
}
