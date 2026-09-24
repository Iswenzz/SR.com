const Loading = () => (
	<section className="relative w-full min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20 gap-8">
		<div className="skeleton h-20 w-full rounded-box bg-base-300/40" />
		<div className="skeleton h-[60vh] w-full rounded-box bg-black/20" />
	</section>
);

export default Loading;
