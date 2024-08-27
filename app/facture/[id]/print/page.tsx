import PrintPdf from '@/components/PrintPdf';
import { Button } from '@/components/ui/button';
import { getFacture } from '@/lib/actions'
import { formatter } from '@/lib/utils';
import Link from 'next/link';


const Print = async ({params: {id}}: SearchParamProps) => {

    const facture = await getFacture(id) || []
    const rest = facture.total - facture.totalVercement;
     return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-cenert justify-center">
        <h2 className="header">Facture #{facture._id}</h2>
        <p className="text-dark-700 text-16-regular mt-2">Date: {new Date(facture.createdAt).toLocaleDateString()}</p>
        <div className="space-y-2 mt-4 bg-dark-400 p-2 rounded-md ">
        <div className="flex gap-2">
              <span className=" text-14-medium">client</span>:
              <span className=" text-14-medium capitalize">{facture.name}</span>
            </div>
            <div className="flex gap-2">
              <span className=" text-14-medium">Phone Number</span>:
              <span className=" text-14-medium">0{facture.phone}</span>
            </div>
            <div className="flex gap-2">
              <span className=" text-14-medium">Address</span>:
              <span className=" text-14-medium capitalize">{facture.address}</span>
            </div>
        </div> 
        <div className="mt-4">
          {facture?.items.map((item: any, index: number) => (
            <div key={index} className="border-b border-dark-700 py-2 flex gap-4">
              <span className="text-16-regular">{item.product}</span>:
              <span className="text-16-regular">{formatter.format(item.price)}</span>
            </div>
          ))}
          <div className="my-4 bg-dark-500 rounded-md shadow-sm space-y-4 p-2">
            <div className="flex gap-2">
              <span className=" text-14-medium">Vercement</span>:
              <span className=" text-14-medium">{formatter.format(facture.totalVercement)}</span>
            </div>
            <div className="flex gap-2">
              <span className=" text-14-medium">Total</span>:
              <span className=" text-14-medium">{formatter.format(facture.total)}</span>
            </div>
            <div className="flex gap-2">
              <span className=" text-14-medium">Rest</span>:
              <span className=" text-14-medium">{formatter.format(rest)}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div>
              <h4 className="text-16-regular">Vercement Historique</h4>
              <div className="flex flex-col space-y-2 my-2 bg-dark-700 w-full rounded-sm shadow-sm p-4">
                {facture.vercement.map((v: any, i: number) => {
                  const formattedDate = new Date(v.date).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                return(
                  <div className="flex items-center gap-2" key={i}>
                    <span key={i} className='text-14-regular text-dark-500 flex justify-end'>{formatter.format(v.amount)}</span> |
                    <span key={i} className='text-14-regular text-dark-500 flex justify-end'>{formattedDate}</span>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
      </div>
        <PrintPdf 
          createdAt={facture.createdAt}
          id={facture._id}
          phone={facture.phone}
          address={facture.address}
          totalVercement={facture.totalVercement}
          name={facture.name}
          total={facture?.total} 
          items={facture?.items.map((item: any) => ({
            product: item.product,
            price: item.price
          }))} 
        />
        
        <Button asChild variant="link">
          <Link href="/admin">
            Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Print