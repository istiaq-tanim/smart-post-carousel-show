import { ICONS } from "../../../smart-post-carousel/assets/metaIcon";

export default function MetaItem({ icon, text }) {
	return (
		<span className="sp-smart-post-carousel-card-meta-item">
			{ICONS[icon]}
			<span className="sp-smart-post-carousel-card-meta-item-text">{text}</span>
		</span>
	);
}
