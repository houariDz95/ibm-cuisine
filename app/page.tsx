
import Heading from "@/components/Heading";
import Heroes from "@/components/Heroes";
import Navbar from "@/components/Navbar";
import PassKeyModal from "@/components/PassKeyModal";


export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === "true"
  return (
    <>
      {isAdmin && <PassKeyModal />}
      <Navbar />
      <main className="pt-40">
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            <Heroes />
          </div>
        </div>
      </main>
    </>
  );
}
