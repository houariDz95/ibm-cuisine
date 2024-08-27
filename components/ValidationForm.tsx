"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"

type ItemType = {
  product: string;
  price: number;
};

const formSchema = z.object({
  product: z.string().min(2, {
    message: "product must be at least 2 characters.",
  }),
  price: z.coerce.number().positive().default(0),
})

const ValidationForm = ({addItem}: {addItem: (item: ItemType) => void}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: "",
            price: 0,
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        // Compute the new array of items
        addItem(values)
        form.reset()
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}   className="flex flex-col lg:flex-row gap-6 items-center py-4 px-10">
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="product" {...field} />
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
              <FormControl>
                <Input placeholder="price"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-primary-btn">
          <PlusIcon className="w-6 h-6" />
        </Button>
      </form>
    </Form>
  )
}

export default ValidationForm