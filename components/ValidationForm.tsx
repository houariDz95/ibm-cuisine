"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";

type ItemType = {
  product: string;
  price: number;
  couleurExterieur?: string;
  couleurInterieur?: string;
  typeModeles?: string;
  typeAccessoirs?: string;
  hauteurDePleinte?: string;
};

const formSchema = z.object({
  product: z.string().min(2, {
    message: "Product must be at least 2 characters.",
  }),
  price: z.coerce.number().positive().default(0),
  couleurExterieur: z.optional(z.string()),
  couleurInterieur: z.optional(z.string()),
  typeModeles: z.optional(z.string()),
  typeAccessoirs: z.optional(z.string()),
  hauteurDePleinte: z.optional(z.string()),
});

const ValidationForm = ({ addItem }: { addItem: (item: ItemType) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      price: 0,
      couleurExterieur: "",
      couleurInterieur: "",
      typeModeles: "",
      typeAccessoirs: "",
      hauteurDePleinte: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Pass the new item to addItem
    addItem(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 py-4 px-10">
        <div className="flex items-center flex-col lg:flex-row gap-6">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Input placeholder="Product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* New fields for additional item details */}
        <div className="flex items-center flex-col lg:flex-row  gap-6">
          <FormField
            control={form.control}
            name="couleurExterieur"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Couleur Extérieur</FormLabel>
                <FormControl>
                  <Input placeholder="Couleur Extérieur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="couleurInterieur"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Couleur Intérieur</FormLabel>
                <FormControl>
                  <Input placeholder="Couleur Intérieur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center flex-col lg:flex-row mb-4 gap-6"> 
          <FormField
            control={form.control}
            name="typeModeles"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Type Modèles</FormLabel>
                <FormControl>
                  <Input placeholder="Type Modèles" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeAccessoirs"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Type Accessoirs</FormLabel>
                <FormControl>
                  <Input placeholder="Type Accessoirs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hauteurDePleinte"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Hauteur de Pleinte</FormLabel>
                <FormControl>
                  <Input placeholder="Hauteur de Pleinte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="shad-primary-btn">
          <PlusIcon className="w-6 h-6" />
        </Button>
      </form>
    </Form>
  );
};

export default ValidationForm;
