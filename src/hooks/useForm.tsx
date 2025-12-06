"use client";

import { useForm as useRHF, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4/core";

const useForm = <T extends z.$ZodType<FieldValues>>(
	schema: T,
	options?: Omit<UseFormProps<z.infer<T>>, "resolver">
): UseFormReturn<z.infer<T>> => {
	return useRHF<z.infer<T>>({
		resolver: zodResolver(schema as any),
		...options
	});
};

export default useForm;
