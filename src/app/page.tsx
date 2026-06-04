import Link from "next/link";

export const revalidate = 3600;

const STATS = [
	{ label: "Players", value: "12K+" },
	{ label: "Records", value: "150K+" },
	{ label: "Modes", value: "7" }
];

const FEATURES = [
	{
		label: "01",
		title: "Leaderboards",
		description: "Per-map rankings by movement style and mode. Download any world record demo.",
		href: "/leaderboards"
	},
	{
		label: "02",
		title: "Player profiles",
		description: "Track personal bests, world records, and overall rankings.",
		href: "/players"
	},
	{
		label: "03",
		title: "Live servers",
		description: "See who's online across every SR server and jump in with one click.",
		href: "/servers"
	}
];

const MODES = ["190", "210", "Q3", "Q3CPM", "Q3CPMW", "CS", "Portal"];

const Home = async () => (
	<section className="relative w-full min-h-screen flex flex-col max-w-7xl px-8 pt-24 pb-20 overflow-hidden">
		<div className="flex items-start justify-between gap-8 mb-auto">
			<div className="max-w-2xl pt-8">
				<div className="flex items-center gap-3 mb-10">
					<span className="w-8 h-px bg-white/20" />
					<span className="text-xs text-white/30 tracking-[0.2em] uppercase font-medium">
						Since 2017
					</span>
				</div>
				<h1 className="text-[clamp(3.5rem,9vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.04em] mb-0">
					<span className="block text-white/90">CoD4</span>
					<span className="block text-transparent bg-clip-text bg-linear-to-br from-[#5c16c6] to-[#9e12ca]">
						SPEEDRUN
					</span>
				</h1>
			</div>
			<div className="hidden md:flex flex-col gap-2 pt-24 shrink-0">
				{STATS.map(s => (
					<div
						key={s.label}
						className="flex items-baseline gap-3 border-b border-white/[0.06] pb-2"
					>
						<span className="text-2xl font-extrabold tracking-tight text-white">
							{s.value}
						</span>
						<span className="text-xs text-white/25 uppercase tracking-widest">
							{s.label}
						</span>
					</div>
				))}
			</div>
		</div>
		<div className="my-12 flex flex-wrap gap-2">
			{MODES.map(m => (
				<span
					key={m}
					className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.03] text-xs font-mono text-white/40 tracking-wider"
				>
					{m}
				</span>
			))}
		</div>
		<p className="text-sm text-white/35 max-w-md leading-relaxed mb-12 border-l-2 border-primary/40 pl-4">
			The home of Call of Duty 4 competitive speedrunning. Race through maps in the fastest
			time possible, compete for world records, and earn XP across every movement style.
		</p>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 border border-white/10 rounded-2xl overflow-hidden mb-12">
			{FEATURES.map(f => (
				<Link
					key={f.title}
					href={f.href}
					className="group relative flex flex-col p-6 backdrop-blur-sm hover:bg-black/20 transition-all duration-200"
				>
					<span className="text-[10px] font-mono text-white/20 tracking-widest mb-4">
						{f.label}
					</span>
					<span className="font-bold text-sm text-white/80 mb-2 group-hover:text-white transition-colors">
						{f.title}
					</span>
					<span className="text-xs text-white/30 leading-relaxed flex-1">
						{f.description}
					</span>
					<span className="mt-4 text-xs text-primary/60 group-hover:text-primary transition-colors">
						Explore →
					</span>
				</Link>
			))}
		</div>
		<div className="flex items-center justify-between flex-wrap gap-4">
			<div className="flex items-center gap-3">
				<Link
					href="/play"
					className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-br from-[#5c16c6] to-[#9e12ca] text-white font-bold text-xs tracking-wide hover:opacity-90 transition-opacity uppercase"
				>
					Start playing
				</Link>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
				<span className="text-xs text-white/25 tracking-wide">Servers online</span>
			</div>
		</div>
	</section>
);

export default Home;
