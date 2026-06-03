"use client";

import { useState } from "react";
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

const defaultGetValue = <Option,>(option: Option): unknown =>
	option && typeof option === "object" && "value" in option ? option.value : option;

const comparator = (a: unknown, b: unknown) => {
	if (a && b && typeof a === "object" && typeof b === "object") {
		if ("id" in a && "id" in b) return a.id === b.id;
		if ("value" in a && "value" in b) return a.value === b.value;
	}
	return a === b;
};

const Select = <Option, Value = unknown>({
	className,
	comboClassName,
	inputClassName,
	label,
	name,
	options = [],
	getLabel = defaultGetLabel,
	getValue = defaultGetValue,
	multiple,
	icon: Icon,
	required,
	disabled,
	value,
	onChange,
	error
}: SelectProps<Option, Value>) => {
	const [query, setQuery] = useState("");

	const selected: Option | Option[] | null = multiple
		? Array.isArray(value)
			? options.filter(option => value.some(v => comparator(getValue(option), v)))
			: []
		: value != null
			? (options.find(option => comparator(getValue(option), value)) ?? null)
			: null;

	const filteredOptions = !query
		? options
		: options.filter(option => getLabel(option).toLowerCase().includes(query.toLowerCase()));

	const handleChange = (next: Option | Option[] | null) => {
		if (multiple) onChange?.((Array.isArray(next) ? next : []).map(getValue) as Value[]);
		else onChange?.((next ? getValue(next as Option) : null) as Value);
	};

	return (
		<Field className={clsx(className, "fieldset w-full")}>
			{label && (
				<Label htmlFor={name} className="flex items-center gap-2">
					{Icon && <Icon size={20} />}
					{label}
					{required && <Asterisk className="text-error" size={20} />}
				</Label>
			)}
			<Combobox
				as="div"
				className={clsx(comboClassName, "group relative")}
				name={name}
				value={selected as unknown}
				virtual={{ options: filteredOptions }}
				onChange={(next: unknown) => handleChange(next as Option | Option[] | null)}
				onClose={() => setQuery("")}
				multiple={multiple}
				disabled={disabled}
			>
				<ComboboxInput
					className={clsx(
						inputClassName,
						"flex items-center justify-between bg-base-300/20 input input-bordered w-full"
					)}
					displayValue={(data: unknown) => {
						const current = data as Option | Option[] | null;
						return current
							? Array.isArray(current)
								? current.map(getLabel).join(", ")
								: getLabel(current)
							: "";
					}}
					onChange={event => setQuery(event.target.value)}
				/>
				<ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
					<ChevronDown className="size-5 duration-200 opacity-50 group-data-open:transform group-data-open:rotate-180" />
				</ComboboxButton>
				<ComboboxOptions
					className="backdrop-blur-2xl bg-base-200/60 ring-1 ring-base-content/10 rounded-box p-1 focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0 w-(--input-width) [--anchor-gap:var(--spacing-1)] z-40"
					anchor="bottom"
					transition
				>
					{({ option }: { option: Option }) => (
						<ComboboxOption
							className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-focus:bg-base-content/10 w-full"
							value={option}
						>
							<Check className="invisible size-4 group-data-selected:visible" />
							<span>{getLabel(option)}</span>
						</ComboboxOption>
					)}
				</ComboboxOptions>
			</Combobox>
			{error && <p className="text-error">{error}</p>}
		</Field>
	);
};

export type SelectProps<Option, Value = unknown> = {
	className?: string;
	comboClassName?: string;
	inputClassName?: string;
	label?: string;
	name?: string;
	options?: Option[];
	getLabel?: (option: Option) => string;
	getValue?: (option: Option) => unknown;
	icon?: LucideIcon;
	required?: boolean;
	disabled?: boolean;
	multiple?: boolean;
	value?: Value | Value[] | null;
	onChange?: (value: Value | Value[]) => void;
	error?: string;
};

export default Select;
