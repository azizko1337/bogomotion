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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type RegisterForm from "@/types/RegisterForm";

const formSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(64),
  birthYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  sex: z.enum(["male", "female", "other"]),
  placeOfResidence: z.enum(["village", "smallCity", "averageCity", "bigCity"]),
  job: z.string().max(256).optional(),
  education: z.string().max(256).optional(),
  medicalHistory: z.string().max(256).optional(),
});

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      sex: "female",
      birthYear: new Date().getFullYear(),
      job: "",
      education: "",
      medicalHistory: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { job, education, medicalHistory } = values;

    const registerForm: RegisterForm = { ...values, additionalInformation: "" };

    registerForm.additionalInformation = `Zawód: ${
      job || "nie podano"
    }, Wykształcenie: ${education || "nie podano"}, Przebyte choroby: ${
      medicalHistory || "nie podano"
    }`;
    console.log(registerForm);
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
                  <Input type="text" placeholder="adres@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Nie wysyłamy żadnych adresów email, potrzebne do logowania.
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
                <FormDescription>Hasło potrzebne do logowania.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rok urodzenia</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1900-2024" {...field} />
                </FormControl>
                <FormDescription>Potrzebny do statystyk.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Płeć</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz płeć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"female"}>Kobieta</SelectItem>
                    <SelectItem value={"male"}>Mężczyzna</SelectItem>
                    <SelectItem value={"other"}>Inna</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Potrzebna do celów statystycznych.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeOfResidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miejsce zamieszkania</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz miejsce zamieszkania" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"village"}>Wioska</SelectItem>
                    <SelectItem value={"smallCity"}>Małe miasto</SelectItem>
                    <SelectItem value={"averageCity"}>
                      Średnia miasto
                    </SelectItem>
                    <SelectItem value={"bigCity"}>Duże miasto</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Potrzebne do celów statystycznych.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zawód (opcjonalne)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="np. informatyk" {...field} />
                </FormControl>
                <FormDescription>Do statystyk.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wykształcenie (opcjonalne)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="np. średnie" {...field} />
                </FormControl>
                <FormDescription>Do statystyk.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medicalHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Przebyte choroby (opcjonalne)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="ospa, covid" {...field} />
                </FormControl>
                <FormDescription>Do statystyk.</FormDescription>
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

export default Register;
