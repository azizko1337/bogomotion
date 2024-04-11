"use client";

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
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Pole musi być tekstem.",
      required_error: "Pole jest wymagane.",
    })
    .email({ message: "Nieprawidłowy adres email." })
    .max(320, { message: "Adres email jest zbyt długi." }),
  password: z
    .string({
      invalid_type_error: "Pole musi być tekstem.",
      required_error: "Pole jest wymagane.",
    })
    .min(8, { message: "Hasło musi mieć minimum 8 znaków." })
    .max(64, { message: "Hasło może mieć maksymalnie 64 znaki." }),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres email</FormLabel>
                <FormControl>
                  <Input placeholder="adres@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Adres email podany przy rejestracji.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hasło</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="8-64 znaków" {...field} />
                </FormControl>
                <FormDescription>
                  Hasło podane przy rejestracji.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2 flex justify-end">
            <Button type="submit">Zaloguj</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;