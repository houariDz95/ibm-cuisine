import FactureForm from '@/components/FactureForm'
import { getFacture } from '@/lib/actions'

const NewFacture =  async ({params: {slug}}: SearchParamProps) => {

    let facture = await getFacture(slug) || [];
  
    // Serialize the data to remove potential circular references
    facture = JSON.parse(JSON.stringify(facture));

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 xl:px-48 flex-col space-y-14">
        <FactureForm slug={slug} facture={facture}/>
    </div>
  )
}

export default NewFacture