"use client"
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import ValidationForm from '@/components/ValidationForm'
import { createFacture, updateFacture } from '@/lib/actions'
import { formatter } from '@/lib/utils'
import { IFacture } from '@/types/facture.type'
import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ItemType = {
    product: string;
    price: number | undefined;
};

const FactureForm = ({slug, facture}: {slug: string, facture: IFacture}) => {
    const label = slug === "new" ? "create" : "update"

    // Use state to manage items
    const router = useRouter()
    const [items, setItems] = useState<ItemType[]>(facture ? facture.items : []);
    
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(facture ? facture.name : "");
    const [address, setAddress] = useState(facture ? facture.address : "");
    const [vercement, setVercement] = useState(""); // Adjust based on how you want to handle vercement data
    const [phone, setPhone] = useState(facture && facture.phone ? facture.phone.toString() : "");

    // Function to remove an item by index
    const remove = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems); // Update state
        window.localStorage.setItem("items", JSON.stringify(newItems)); // Update localStorage
    };

    // Example of how you might add a new item
    const addItem = (newItem: ItemType) => {
        const newItems = Array.isArray(items) ? [...items, newItem] : [newItem];
        setItems(newItems); // Update state
        window.localStorage.setItem("items", JSON.stringify(newItems)); // Update localStorage
    };
    

    const handleSubmit = async () => {
        setLoading(true);
    
        const data = {
            items: items,
            name: name,
            address: address,
            vercement: vercement,
            phone: phone
        };
    
        try {
            if (!items.length) return null;
    
            let res;
            if (facture && facture._id) {
                // Update the existing facture
                res = await updateFacture(facture._id, data);
            } else {
                // Create a new facture
                res = await createFacture(data);
            }
    
            if (res) {
                router.push(`/facture/${res._id}/print`);
                window.localStorage.removeItem("items");
            }
    
        } catch (error: any) {
            console.log(error);
            alert("Error:" + error?.message)
        }
    
        setLoading(false);
    };
    
  return (
    <>
        <header className="admin-header">
            <Logo />
            <p className="text-16-semibold">{label} Facture</p>
        </header>
        <main className="admin-main">
            <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700 capitalize">
                 {label} new appointments
            </p>
            </section>
        </main>
        <ValidationForm  addItem={addItem} />

        <div className="px-[5%] py-5 shadow-lg xl:px-12 space-y-4"> 
            {!items && <p className="flex items-center justify-center header capitalize">no items</p>}
            {items && <div className="flex flex-col flex-1 space-y-4">
                {items.map((item: any, index: number) => (
                    <div key={index} className="flex-1 flex items-center justify-between mt-3 shadow-sm rounded-md bg-dark-200 border-b border-dark-500">
                        <span className="text-16-regular border-r border-dark-500 px-2">{index + 1}</span>
                        <span className="text-16-regular flex-1 pl-2">{item.product}</span>
                        <span className="text-16-regular flex-1">{formatter.format(item.price)}</span>
                        <Button size="icon" variant="ghost" onClick={() => remove(index)}>
                            <TrashIcon className="h-5 w-5 text-red-600" />
                        </Button>
                    </div>
                ))}
            </div>}
        </div>

        {items && (
            <div className='flex flex-col gap-4'>
                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className="shad-input w-full rounded-md px-2" />
                <input placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} className="shad-input w-full rounded-md px-2" />
                <input placeholder='Vercement' type='number' value={vercement} onChange={(e) => setVercement(e.target.value)} className="shad-input w-full rounded-md px-2" />
                <input placeholder='Phone' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} className="shad-input w-full rounded-md px-2" />
                <Button className="shad-primary-btn w-full" onClick={handleSubmit}>
                    {loading ? "submiting..." : "Submit"}
                </Button>
            </div>
        )}
    </>
  )
}

export default FactureForm