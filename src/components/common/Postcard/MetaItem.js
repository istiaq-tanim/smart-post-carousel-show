import { ICONS } from "../../../smart-post-carousel/assets/metaIcon";

export default function MetaItem({ icon, text, color, typo }) {
	const normalColor = color?.normal ?? color ?? "inherit";
	const hoverColor = color?.hover || normalColor;
	return (
		<span
			className="sp-smart-post-carousel-card-meta-item"
			style={{
				"--meta-normal-color": normalColor,
				"--meta-hover-color": hoverColor,
			}}
		>
			<span className="sp-smart-post-carousel-card-meta-item-icon">
				{ICONS[icon]}
			</span>
			<span className="sp-smart-post-carousel-card-meta-item-text">{text}</span>
		</span>
	);
}
