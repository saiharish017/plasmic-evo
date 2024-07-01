"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Textarea } from "@/components/ui/textarea"


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


const translations = {
  en: {
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email Address",
    phoneNumber: "Phone Number",
    message: "Message",
    submit: "Submit",
    successTitle: "Thank You for Reaching Out!",
    successMessage:
      "Your information has been successfully submitted. Our team will review your details and get back to you as soon as possible.",
    failureTitle: "Submission Failed",
    failureMessage:
      "There was an error submitting your information. Please try again later.",
    retry: "Retry",
    errors: {
      firstname: "First name must be at least 2 characters.",
      email: "Invalid email address.",
      phoneNumber: "Phone number must be at least 10 characters.",
    },
  },
  it: {
    firstname: "Nome",
    lastname: "Cognome",
    email: "Indirizzo Email",
    phoneNumber: "Numero di Telefono",
    message: "Messaggio",
    submit: "Invia",
    successTitle: "Grazie per averci contattato!",
    successMessage:
      "Le tue informazioni sono state inviate con successo. Il nostro team esaminerà i tuoi dettagli e ti risponderà al più presto.",
    failureTitle: "Invio Fallito",
    failureMessage:
      "C'è stato un errore nell'invio delle tue informazioni. Per favore riprova più tardi.",
    retry: "Riprova",
    errors: {
      firstname: "Il nome deve contenere almeno 2 caratteri.",
      email: "Indirizzo email non valido.",
      phoneNumber: "Il numero di telefono deve contenere almeno 10 caratteri.",
    },
  },
};
type Locale = keyof typeof translations;

const getFormSchema = (locale: Locale) => {
  const t = translations[locale];

  return z.object({
    firstname: z.string().min(2, {
      message: t.errors.firstname,
    }),
    lastname: z.string().optional(),
    email: z.string().email({
      message: t.errors.email,
    }),
    phoneNumber: z.string().min(10, {
      message: t.errors.phoneNumber,
    }),
    Message: z.string().optional(),
  });
};
export default function ProfileForm() {
  const { locale } = useRouter();
  const currentLocale = locale || 'en'; // Fallback to 'en' if locale is undefined
  const t = translations[currentLocale as keyof typeof translations];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitFailed, setsubmitFailed] = useState(false);
  const [isFormVisible, setFormVisible] = useState(true);
  const formSchema = getFormSchema(currentLocale as keyof typeof translations);
 


  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  type FormValues = z.infer<typeof formSchema>;
     // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber:"",
      Message: "",

    },
  })
  const failedClose = () => {
    setFormVisible(true);
    setsubmitFailed(false)};
    
 
  // 2. Define a submit handler.
  const onSubmit = async (values: FormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setFormVisible(false);
        setIsDialogOpen(true);
      } else {
        setsubmitFailed(true);
        setFormVisible(false);
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
  }
  // ...

  return (
    <div className="w-full text-black p-10 sm:p-5">
      {isFormVisible &&
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-7 sm:flex-col ">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">{t.firstname}*</FormLabel>
              <FormControl>
                <Input placeholder={t.firstname} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white" >{t.lastname}</FormLabel>
              <FormControl>
                <Input placeholder={t.lastname} {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">{t.email}*</FormLabel>
            <FormControl>
              <Input placeholder={t.email} {...field} className="bg-white" />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      /><FormField
      control={form.control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{t.phoneNumber}*</FormLabel>
          <FormControl>
            <Input placeholder={t.phoneNumber} {...field} />
          </FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="Message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{t.message}</FormLabel>
          <FormControl>
            <Textarea placeholder={t.message} {...field} />
          </FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
        <Button  className="bg-black text-white" type="submit">{t.submit}</Button>
      </form>
    </Form>}
    
    {isDialogOpen &&
    <div>
    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 grid justify-center">
            
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2  mx-auto mb-3.5">
                <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.successTitle}</p>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 max-w-[350px] text-center">{t.successMessage} </p>
    </div></div>}
    {submitFailed &&
    <div>
    <div className="relative p-8 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 grid justify-center ">
            
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.2426 117.243C29.8995 114.899 29.5684 111.432 31.5031 109.497L109.35 31.6503C111.284 29.7156 114.752 30.0467 117.095 32.3898C119.439 34.733 119.77 38.2009 117.835 40.1356L39.9884 117.982C38.0537 119.917 34.5858 119.586 32.2426 117.243Z" fill="#F87171"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.7574 32.2426C34.1005 29.8995 37.5684 29.5684 39.5031 31.5031L117.35 109.35C119.284 111.284 118.953 114.752 116.61 117.095C114.267 119.439 110.799 119.77 108.864 117.835L31.0178 39.9884C29.0831 38.0537 29.4142 34.5858 31.7574 32.2426Z" fill="#F87171"/>
</svg>



                <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{t.failureTitle}</p>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 max-w-[350px]">{t.failureMessage} </p>
            <div><Button className="bg-black text-white" onClick={failedClose}>Close</Button></div>
    </div></div>}
   
   
    </div>
    
    )}
