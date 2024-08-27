import Logo from "@/components/Logo";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";

import { Button } from "@/components/ui/button";
import { getCompletedFactures, getFactures } from "@/lib/actions";
import Link from "next/link";


const AdminPage = async () => {

  const factures = await getFactures();
  const totalRevenue = factures?.reduce((sum, facture) => sum + (facture.total || 0), 0);

  const completedFactures = await getCompletedFactures()
  const totalCompletedRevenue = completedFactures?.reduce((sum, facture) => sum + (facture.total || 0), 0);

  const serializedFactures = factures?.map(facture => {
    // Convert Mongoose document to plain object
    const plainFacture = facture.toObject(); 
    return {
      ...plainFacture,
      _id: plainFacture._id.toString(),  // Convert ObjectId to string
      createdAt: plainFacture.createdAt.toISOString(),  // Convert Date to string
      items: plainFacture.items.map((item: any) => ({
        product: item.product,
        price: item.price,  // Assuming these are plain values
      })),
    };
  });
  
  return (
    <div className="mx-auto max-w-7xl flex-col space-y-14 mb-10">
        <header className="admin-header">
            <Logo />
            <Button asChild className="bg-green-500 text-white hover:bg-green-500/80">
                <Link href="/create/new">
                    Create
                </Link>
            </Button>
        </header>

        <main className="admin-main">
            <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">
                Start the day with managing new Factures
            </p>
            </section>
        </main>

        <section className="admin-stat">
          <StatCard
            type="factures"
            count={factures?.length!}
            revenue={totalRevenue}
            label="All Factures"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={factures?.length - completedFactures?.length}
            label="Not Completed Factures"
            revenue={totalRevenue - totalCompletedRevenue}
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={completedFactures.length}
            label="Completed Factures"
            revenue={totalCompletedRevenue}
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns}  data={serializedFactures!} />
    </div>
  )
}

export default AdminPage