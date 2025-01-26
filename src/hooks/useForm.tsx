"use client";

import { useForm as useRHF, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

const useForm = <T extends ZodType>(
	schema: T,
	options?: UseFormProps<z.infer<T>>
): UseFormReturn<z.infer<T>> => useRHF({ ...options, resolver: zodResolver(schema) });

export default useForm;
