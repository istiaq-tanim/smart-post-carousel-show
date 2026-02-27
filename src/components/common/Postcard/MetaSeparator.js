const separatorMap = {
	space: "",
	fullStop: ".",
	straight: "|",
	slash: "/",
	backSlash: "\\",
};
export default function MetaSeparator({ type }) {
	if (!type || !separatorMap[type]) return null;

	return (
		<span className="sp-smart-post-carousel-meta-separator">
			{separatorMap[type]}
		</span>
	);
}
