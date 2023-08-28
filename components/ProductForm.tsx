"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Product } from "@/types";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  price: z.string(),
});

interface ProductFormProps {
  heading: string;
  productInfo?: Product;
}

const ProductForm = ({ heading, productInfo }: ProductFormProps) => {
  const [goback, setGoback] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: productInfo?.title || "",
      description: productInfo?.description || "",
      price: productInfo?.price || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (productInfo?._id) {
      axios.put("/api/products?id=" + productInfo._id, values);
      setGoback(true);
    } else {
      axios.post("/api/products", values);
      setGoback(true);
    }
  }

  if (goback) {
    redirect("/products");
  }

  return (
    <>
      <h1 className="text-xl font-semibold mb-2 text-blue-400">{heading}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{productInfo?._id ? "Edit" : "Create"}</Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
