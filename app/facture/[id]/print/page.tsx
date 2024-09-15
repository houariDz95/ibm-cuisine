import PrintPdf from '@/components/PrintPdf';
import { Button } from '@/components/ui/button';
import { getFacture } from '@/lib/actions'
import { formatter } from '@/lib/utils';
import Link from 'next/link';
import { number } from 'zod';


const Print = async ({params: {id}}: SearchParamProps) => {

    const facture = await getFacture(id) || []
    const rest = facture.total - facture.totalVercement;
    console.log(facture)
     return (
      <div className="w-full min-h-screen flex items-center justify-center bg-dark-900 text-gray-200">
        <div className="flex flex-col items-center justify-center w-[90%] max-w-4xl p-6 bg-dark-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Facture #{facture.factureNumber}</h2>
          <p className="text-gray-400 text-sm mb-4">Date: {new Date(facture.createdAt).toLocaleDateString()}</p>
          
          {/* Client Info */}
          <div className="space-y-2 w-full bg-dark-400 p-4 rounded-md">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-400">Client</span>
              <span className="text-sm font-medium capitalize">{facture.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-400">Phone Number</span>
              <span className="text-sm font-medium">0{facture.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-400">Address</span>
              <span className="text-sm font-medium capitalize">{facture.address}</span>
            </div>
          </div>

          {/* Items List */}
          <div className="w-full mt-6 space-y-3">
              {facture?.items.map((item: any, index: number) => (
                <div key={index} className="bg-dark-400 p-4 rounded-md space-y-2">
                  {/* Main product and price */}
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium">{item.product}</span>
                    <span className="text-base font-medium">{formatter.format(item.price)}</span>
                  </div>
                  
                  {/* Additional item details */}
                  <div className="space-y-1 text-sm text-gray-400">
                    {item.couleurExterieur && (
                      <div className="flex justify-between">
                        <span>Couleur Exterieur:</span>
                        <span className="capitalize">{item.couleurExterieur}</span>
                      </div>
                    )}
                    {item.couleurInterieur && (
                      <div className="flex justify-between">
                        <span>Couleur Interieur:</span>
                        <span className="capitalize">{item.couleurInterieur}</span>
                      </div>
                    )}
                    {item.typeModeles && (
                      <div className="flex justify-between">
                        <span>Type Modèles:</span>
                        <span className="capitalize">{item.typeModeles}</span>
                      </div>
                    )}
                    {item.typeAccessoires && (
                      <div className="flex justify-between">
                        <span>Type Accessoires:</span>
                        <span className="capitalize">{item.typeAccessoires}</span>
                      </div>
                    )}
                    {item.hauteurDePleinte && (
                      <div className="flex justify-between">
                        <span>Dimension:</span>
                        <span>{item.hauteurDePleinte}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>


          {/* Total, Vercement, Rest */}
          <div className="my-6 bg-dark-400 p-4 rounded-md w-full space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-400">Vercement</span>
              <span className="text-sm font-medium">{formatter.format(facture.totalVercement)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-400">Total</span>
              <span className="text-sm font-medium">{formatter.format(facture.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-400">Rest</span>
              <span className="text-sm font-medium">{formatter.format(rest)}</span>
            </div>
          </div>

          {/* Vercement History */}
          <div className="flex flex-col w-full">
            <h4 className="text-lg font-bold mb-3">Vercement Historique:</h4>
            <div className="flex flex-col space-y-2 bg-dark-400 p-4 rounded-md">
              {facture.vercement.map((v: any, i: number) => {
                const formattedDate = new Date(v.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                return (
                  <div className="flex justify-between items-center" key={i}>
                    <span className="text-sm font-medium">{formatter.format(v.amount)}</span>
                    <span className="text-sm text-gray-400">{formattedDate}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Print and Home Buttons */}
          <div className="flex justify-end w-full mt-6 space-x-4">
            <PrintPdf 
              createdAt={facture.createdAt}
              phone={facture.phone}
              address={facture.address}
              totalVercement={facture.totalVercement}
              name={facture.name}
              total={facture?.total}
              factureNumber={facture?.factureNumber}
              items={facture?.items.map((item: any) => ({
                product: item.product,
                price: item.price,
                couleurExterieur: item.couleurExterieur,
               couleurInterieur: item.couleurInterieur,
               typeModeles : item.typeModeles,
               typeAccessoirs: item.typeAccessoirs, 
               hauteurDePleinte: item.hauteurDePleinte,
              }))} 
          
            />
            
            <Button asChild variant="link" className="text-blue-500 hover:text-blue-600">
              <Link href="/admin">
                Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

  )
}

export default Print