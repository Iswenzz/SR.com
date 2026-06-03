"use client";

import { useForm as useRHF, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/v4/core";

const useForm = <T extends z.$ZodType<FieldValues, FieldValues>>(
	schema: T,
	options?: Omit<UseFormProps<z.input<T>, unknown, z.output<T>>, "resolver">
): UseFormReturn<z.input<T>, unknown, z.output<T>> => {
	return useRHF<z.input<T>, unknown, z.output<T>>({
		resolver: zodResolver(schema),
		...options
	});
};

export default useForm;
