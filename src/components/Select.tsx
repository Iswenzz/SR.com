"use client";

import { SelectHTMLAttributes, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Asterisk, Check, ChevronDown, LucideIcon } from "lucide-react";
import clsx from "clsx";

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Field,
	Label
} from "@headlessui/react";

const defaultGetLabel = <Option,>(option: Option) =>
	option && typeof option === "object" && "label" in option ? `${option.label}` : `${option}`;

const defaultGetValue = <Option,>(option: Option) =>
	option && typeof option === "object" && "value" in option ? option.value : option;

const comparator = <Option,>(a: Option, b: Option) => {
	if (a && b && typeof a === "object" && typeof b === "object") {
		if ("id" in a && "id" in b) return a.id === b.id;
		if ("value" in a && "value" in b) return a.value === b.value;
	}
	return a === b;
};

const Select = <Option,>({
	className,
	label,
	name,
	options = [],
	getLabel = defaultGetLabel,
	getValue = defaultGetValue,
	onClickOption,
	form,
	defaultValue = [],
	icon: Icon,
	multiple,
	required,
	disabled
}: SelectProps<Option>) => {
	const [query, setQuery] = useState("");

	const field = form.getFieldState(name);
	const formValue = form.watch(name);

	const value = multiple
		? formValue
			? options.filter(option =>
					formValue.find((v: Option) => comparator(getValue(option), getValue(v)))
				)
			: defaultValue
		: formValue
			? options.find(option => comparator(getValue(option), getValue(formValue)))
			: defaultValue;

	const filteredOptions = !query
		? options
		: options.filter(option => getLabel(option).toLowerCase().includes(query.toLowerCase()));

	const handleChange = (option: Option) => form.setValue(name, getValue(option));
	const handleChangeMultiple = (options: Option[]) => form.setValue(name, options.map(getValue));

	return (
		<Field className="form-control space-y-2 w-full">
			{label && (
				<Label htmlFor={name} className="flex items-center gap-2">
					{Icon && <Icon size={20} />}
					{label}
					{required && <Asterisk className="text-error" size={20} />}
				</Label>
			)}
			<Combobox
				as="div"
				className="group relative"
				name={name}
				value={value || defaultValue}
				virtual={{ options: filteredOptions }}
				onChange={multiple ? handleChangeMultiple : handleChange}
				onClose={() => setQuery("")}
				multiple={multiple}
				disabled={disabled}
			>
				<ComboboxInput
					className={clsx(
						className,
						"flex items-center justify-between bg-base-300/20 input input-bordered w-full"
					)}
					displayValue={(data: any) =>
						multiple ? data.map(getLabel).join(", ") : data && getLabel(data)
					}
					onChange={event => setQuery(event.target.value)}
				/>
				<ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
					<ChevronDown className="size-5 duration-200 opacity-50 group-data-[open]:transform group-data-[open]:rotate-180" />
				</ComboboxButton>
				<ComboboxOptions
					className="backdrop-blur-2xl bg-base-200/60 ring-1 ring-base-content/10 rounded-box p-1 focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 w-[var(--input-width)] [--anchor-gap:var(--spacing-1)] z-40"
					anchor="bottom"
					transition
				>
					{({ option }) => (
						<ComboboxOption
							className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-base-content/10 w-full"
							value={option}
							onClick={() => onClickOption?.(option)}
						>
							<Check className="invisible size-4 group-data-[selected]:visible" />
							<span>{getLabel(option)}</span>
						</ComboboxOption>
					)}
				</ComboboxOptions>
			</Combobox>
			{field.error && <p className="text-error">{field.error.message}</p>}
		</Field>
	);
};

export type SelectProps<Option> = Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	"form" | "defaultValue"
> & {
	label?: string;
	name: string;
	form: UseFormReturn<any>;
	options?: Option[];
	defaultValue?: unknown;
	getLabel?: (value: Option) => string;
	getValue?: (value: Option) => unknown;
	onClickOption?: (value: Option) => void;
	icon?: LucideIcon;
	multiple?: boolean;
};

export default Select;
