"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const NavbarMenu = () => (
	<Menu>
		<MenuButton className="btn btn-ghost btn-circle" aria-label="Menu">
			<MenuIcon size={24} />
		</MenuButton>
		<MenuItems
			anchor="bottom start"
			className="mt-2 w-52 origin-top-right rounded-xl backdrop-blur-xl bg-black/40 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-40"
			transition
		>
			<MenuItem>
				{({ close }) => (
					<Link
						className="btn btn-ghost w-full"
						href="/leaderboards"
						aria-label="Leaderboards"
						onClick={close}
					>
						Leaderboards
					</Link>
				)}
			</MenuItem>
			<MenuItem>
				{({ close }) => (
					<Link
						className="btn btn-ghost w-full"
						href="/players"
						aria-label="Players"
						onClick={close}
					>
						Players
					</Link>
				)}
			</MenuItem>
		</MenuItems>
	</Menu>
);

export default NavbarMenu;
