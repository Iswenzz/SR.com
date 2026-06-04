import Link from "next/link";

import NavbarMenu from "./NavbarMenu";
import Image from "next/image";

const Navbar = () => (
	<nav className="fixed z-30 navbar px-4 py-2 min-h-12 text-gray-300 bg-black/20 backdrop-blur-lg">
		<NavbarDesktop />
		<NavbarMobile />
	</nav>
);

const NavbarDesktop = () => (
	<div className="hidden md:flex mx-auto max-w-7xl w-full">
		<div className="flex navbar-start gap-4">
			<Logo />
		</div>
		<div className="flex navbar-end gap-4">
			<Links />
		</div>
	</div>
);

const NavbarMobile = () => (
	<div className="flex md:hidden w-full">
		<div className="flex navbar-start">
			<NavbarMenu />
			<Logo />
		</div>
	</div>
);

const Logo = () => (
	<Link
		className="btn btn-ghost text-xl font-extrabold tracking-widest"
		href="/"
		aria-label="Home"
	>
		<Image
			className="rounded-full"
			src="/images/logo.jpg"
			alt="SR Speedrun"
			width={34}
			height={34}
			priority
		/>
		SPEEDRUN
	</Link>
);

const Links = () => (
	<>
		<Link
			className="btn btn-ghost text-lg tracking-widest"
			href="/leaderboards"
			aria-label="Leaderboards"
		>
			LEADERBOARDS
		</Link>
		<Link
			className="btn btn-ghost text-lg tracking-widest"
			href="/players"
			aria-label="Players"
		>
			PLAYERS
		</Link>
		<Link
			className="btn btn-ghost text-lg tracking-widest"
			href="/servers"
			aria-label="Servers"
		>
			SERVERS
		</Link>
		<Link
			className="btn text-lg tracking-widest bg-linear-to-br from-[#5c16c6] to-[#9e12ca] hover:opacity-90 transition-opacity"
			href="/play"
			aria-label="Play"
		>
			PLAY
		</Link>
	</>
);

export default Navbar;
