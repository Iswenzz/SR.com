import Link from "next/link";

const Footer = () => (
	<footer className="relative w-full bg-black/10 backdrop-blur-sm border-t border-white/[0.05] mt-20">
		<div className="max-w-4xl mx-auto px-8 py-12 flex flex-col gap-8">
			<div className="flex items-start justify-between gap-8 flex-wrap">
				<div className="max-w-xs">
					<div className="text-lg font-extrabold tracking-wider text-white mb-2">SR</div>
					<p className="text-xs text-white/25 leading-relaxed">
						The home of Call of Duty 4 competitive speedrunning since 2017. Fully open
						source and community driven.
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Link
						href="https://github.com/Iswenzz"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all"
					>
						<svg
							className="w-4 h-4 text-white/50 group-hover:text-white transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
						</svg>
						<span className="text-xs font-semibold text-white/50 group-hover:text-white transition-colors">
							Open source
						</span>
					</Link>
					<Link
						href="https://ko-fi.com/iswenzz"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#9e12ca]/40 hover:bg-[#9e12ca]/10 transition-all"
					>
						<svg
							className="w-4 h-4 text-white/50 group-hover:text-[#c47ef0] transition-colors"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 2.692.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
						</svg>
						<span className="text-xs font-semibold text-white/50 group-hover:text-[#c47ef0] transition-colors">
							Support SR
						</span>
					</Link>
				</div>
			</div>
			<div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.04]">
				<div className="flex items-center gap-6">
					<Link
						href="/leaderboards"
						className="text-xs text-white/20 hover:text-white/50 transition-colors"
					>
						Leaderboards
					</Link>
					<Link
						href="/players"
						className="text-xs text-white/20 hover:text-white/50 transition-colors"
					>
						Players
					</Link>
					<Link
						href="/servers"
						className="text-xs text-white/20 hover:text-white/50 transition-colors"
					>
						Servers
					</Link>
					<Link
						href="/play"
						className="text-xs text-white/20 hover:text-white/50 transition-colors"
					>
						Play
					</Link>
				</div>
				<span className="text-xs text-white/15">© {new Date().getFullYear()} Iswenzz</span>
			</div>
		</div>
	</footer>
);

export default Footer;
