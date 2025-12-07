// DemoPage.tsx (Server Component)
import { columns, Intern } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Intern[]> {
  const res = await fetch("https://68827f2121fa24876a9b0e5c.mockapi.io/codolog/table", {
    method: "GET",
    cache: "no-store", // ensures fresh data on every reload
  });

  if (!res.ok) {
    throw new Error("Failed to fetch interns");
  }

  return res.json();
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
