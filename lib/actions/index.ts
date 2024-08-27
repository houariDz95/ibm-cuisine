"use server"
import Facture from "@/models/facture.modal"
import { connectToDb } from "../mongoose"
import { revalidatePath } from "next/cache"

export const createFacture = async (data: any) =>  {
    try {
        await connectToDb()
        const facture = await Facture.create({
            items: data.items,
            name: data.name,
            address: data.address,
            vercement: [
                {
                    amount: data.vercement || 0,
                    date: new Date()
                }
            ] || [], // Default to an empty array if not provided
            phone: data.phone,
        })
        revalidatePath(`/admin`);
        revalidatePath(`/facture/${facture._id}/print`);
        return facture.toObject()
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message); // This error message can be used on the frontend

    }
}

export const getFactures = async () => {
    try {
        await connectToDb();

        const factures = await Facture.find()
        
        return factures
    } catch (error: any) {   
        console.log(error)
        throw new Error(error.message); // This error message can be used on the frontend
    }
}

export const getFacture = async (id: string) => {
    try {
        await connectToDb();
        const facture = await Facture.findById(id)

        return facture
    } catch (error) {
        console.log(error)
    }
}

export const deleteFacture = async (id: string) => {
    try {
        await connectToDb();
        const deletedFacture = await Facture.findByIdAndDelete(id, {new: true, runValidators: true} );
        if (!deletedFacture) {
            return 'Facture not found';
        }
        revalidatePath('/admin');
        return "facture deleted successfully";

    } catch (error) {
        console.log(error) 
    }
}

export const getCompletedFactures = async () => {
    try {
        await connectToDb();

        // Find all factures where isCompleted is true
        const completedFactures = await Facture.find({ isCompleted: true });

        return completedFactures;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve completed factures');
    }
};


export const updateFacture = async (id: string, data: any) => {
    try {
        await connectToDb();

        // Fetch the existing facture
        const existingFacture = await Facture.findById(id);
        if (!existingFacture) {
            throw new Error('Facture not found');
        }

        // Calculate the new total vercement
        const newTotalVercement = (Number(data.vercement) || 0) + Number(existingFacture.totalVercement);
        const totalPrice = data.items.reduce((acc: number, item: { price: number }) => acc + Number(item.price), 0);

        // Check if the new total vercement would exceed the total
        if (newTotalVercement > totalPrice) {
            throw new Error('Vercement cannot exceed the total facture amount');
        }

        // Create the update operations object
        const updateOperations: any = {
            $set: {
                items: data.items,
                name: data.name,
                address: data.address,
                phone: data.phone,
                // Update isCompleted based on the new totals
                isCompleted: newTotalVercement === totalPrice,
            }
        };

        // If there is a new vercement, add it
        if (data.vercement && data.vercement > 0) {
            updateOperations['$push'] = {
                vercement: {
                    amount: data.vercement,
                    date: new Date(),
                },
            };
        }

        // Perform the update
        const updatedFacture = await Facture.findByIdAndUpdate(
            id,
            updateOperations,
            { new: true, runValidators: true }
        );

        // Revalidate the path for ISR
        revalidatePath(`/facture/${updatedFacture._id}/print`);

        return updatedFacture.toObject();
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message); // This error message can be used on the frontend
    }
};

