"use client"
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import ValidationForm from '@/components/ValidationForm'
import { createFacture, updateFacture } from '@/lib/actions'
import { formatter } from '@/lib/utils'
import { IFacture } from '@/types/facture.type'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
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

        <div className="px-[5%] py-5 shadow-lg xl:px-12 space-y-6 bg-dark-400 rounded-lg">
            {!items || items.length === 0 ? (
                <p className="flex items-center justify-center text-xl font-medium text-gray-400">
                No items available
                </p>
            ) : (
                <div className="flex flex-col space-y-4">
                {items.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-dark-300 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-dark-500"
                        >
                            <span className="text-lg font-semibold text-gray-300">{index + 1}</span>
                            <div className="flex flex-col flex-1 px-4 space-y-1">
                                <span className="text-base font-medium text-gray-200">{item.product}</span>
                                <div className="text-sm text-gray-400">
                                <span>Exterior Color: {item.couleurExterieur ? item.couleurExterieur : "Null"}</span> | 
                                <span> Interior Color: {item.couleurInterieur ? item.couleurExterieur : "Null"}</span> | 
                                <span> Model Type: {item.typeModeles ? item.typeModeles : "Null"}</span> | 
                                <span> Accessories: {item.typeAccessoirs ? item.typeAccessoirs : "Null"}</span> | 
                                <span> Height: {item.hauteurDePleinte ? item.hauteurDePleinte : "Null"}</span>
                                </div>
                            </div>
                            <span className="text-lg font-medium text-gray-300">{formatter.format(item.price)}</span>
                            <Button size="icon" variant="ghost" onClick={() => remove(index)}>
                                <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-600" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    )}
            </div>
            {items && (
                <div className="flex flex-col gap-6">
                    <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-dark-400 text-gray-200 border border-dark-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md w-full px-3 py-2"
                    />

                    <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-dark-400 text-gray-200 border border-dark-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md w-full px-3 py-2"
                    />

                    <input
                    placeholder="Vercement"
                    type="number"
                    value={vercement}
                    onChange={(e) => setVercement(e.target.value)}
                    className="bg-dark-400 text-gray-200 border border-dark-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md w-full px-3 py-2"
                    />
                    
                    <input
                    placeholder="Phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-dark-400 text-gray-200 border border-dark-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md w-full px-3 py-2"
                    />
                    <Button className="w-full bg-green-500 text-white mb-8 py-2" onClick={handleSubmit}>
                        {loading ? "Submiting..." : "Submit"}
                    </Button>
                </div>
             )}
        </>
  )
}

export default FactureForm