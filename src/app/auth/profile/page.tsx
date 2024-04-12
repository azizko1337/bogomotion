"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
import Loading from "@/components/Loading";
import type FrontendUser from "@/types/FrontendUser";

import type RegisterForm from "@/types/RegisterForm";

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
  birthYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  sex: z.enum(["male", "female", "other"]),
  placeOfResidence: z.enum(["village", "smallCity", "averageCity", "bigCity"], {
    invalid_type_error: "Nieprawidłowe miejsce zamieszkania.",
  }),
  job: z
    .string({
      invalid_type_error: "Pole musi być tekstem.",
    })
    .max(256, { message: "Maksymalnie 256 znaków." })
    .optional(),
  education: z
    .string({
      invalid_type_error: "Pole musi być tekstem.",
    })
    .max(256, { message: "Maksymalnie 256 znaków." })
    .optional(),
  medicalHistory: z
    .string({
      invalid_type_error: "Pole musi być tekstem.",
    })
    .max(256, { message: "Maksymalnie 256 znaków." })
    .optional(),
});

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<FrontendUser | null>(null);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth/user", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .catch((error) => router.push("/"));
  }, [setUser]);

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

  useEffect(() => {
    form.setValue("email", user?.email || "");
    form.setValue("birthYear", user?.birthYear || new Date().getFullYear());
    form.setValue("placeOfResidence", user?.placeOfResidence || "village");
    form.setValue("sex", user?.sex || "female");

    const additionalInformation = user?.additionalInformation || "";
    const additionalInformationArray =
      additionalInformation.split(/[:][\s]|[,][\s]/);

    console.log(additionalInformationArray);
    form.setValue(
      "job",
      additionalInformation[1] != "nie podano"
        ? additionalInformationArray[1]
        : additionalInformationArray[1]
    );
    form.setValue(
      "education",
      additionalInformation[3] != "nie podano"
        ? additionalInformationArray[3]
        : additionalInformationArray[3]
    );
    form.setValue(
      "medicalHistory",
      additionalInformation[5] != "nie podano"
        ? additionalInformationArray[5]
        : additionalInformationArray[5]
    );
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { job, education, medicalHistory } = values;

    const registerForm: RegisterForm = { ...values, additionalInformation: "" };

    registerForm.additionalInformation = `Zawód: ${
      job || "nie podano"
    }, Wykształcenie: ${education || "nie podano"}, Przebyte choroby: ${
      medicalHistory || "nie podano"
    }`;

    const res = await fetch("/api/auth/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
    });
    const data = await res.json();
    if (res.status === 200) {
      router.push("/");
      router.refresh();
    } else {
      setServerError(data?.message || "Błąd komunikacji z serwerem.");
    }
  }

  async function handleLogout() {
    const res = await fetch("/api/auth/logout", { method: "GET" });
    if (res.status === 200) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setServerError(data?.message || "Błąd komunikacji z serwerem.");
    }
  }

  async function handleDelete() {
    const res = await fetch("/api/auth/user", { method: "DELETE" });
    if (res.status === 200) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setServerError(data?.message || "Błąd komunikacji z serwerem.");
    }
  }

  if (!user) return <Loading />;

  return (
    <div className="w-full max-w-md">
      <h2 className="text-center mb-8 text-4xl font-bold mb-4">PROFIL</h2>
      <div className="w-full max-w-md p-5 backdrop-blur-sm bg-white bg-opacity-30 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="adres@gmail.com"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="8-64 znaków"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Potrzebne do logowania. Jeśli nie chcesz zmieniać hasła,
                    wpisz tutaj swoje stare hasło.
                  </FormDescription>
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
                  <FormDescription>Do statystyk.</FormDescription>
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
                  <FormDescription>Do statystyk.</FormDescription>
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
                  <FormDescription>Do statystyk.</FormDescription>
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
                    <Input
                      type="text"
                      placeholder="np. informatyk"
                      {...field}
                    />
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
                    <Input
                      type="text"
                      placeholder="np. ospa covid"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Do statystyk, prosimy o wymienienie po spacji.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="flex justify-end text-red-700">{serverError}</p>
            <div className="space-y-2 flex justify-end items-center">
              <Button type="submit">Aktualizuj profil</Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="space-y-2 flex gap-2 justify-center items-end">
        <Button onClick={handleLogout}>Wyloguj</Button>
        <Button onDoubleClick={handleDelete}>
          Usuń konto (kliknij podwójnie)
        </Button>
      </div>
    </div>
  );
}

export default Profile;
