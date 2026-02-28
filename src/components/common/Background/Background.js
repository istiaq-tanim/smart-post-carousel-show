import { backGroundStyles } from "../../../const";
import CustomColorPicker from "../CustomColorPicker/CustomColorPicker";
import GradientBackground from "./Gradient";

function BackgroundStyle({
	backgroundStyle,
	onChange,
	contentEffect,
	label = "Background Style",
}) {
	const isHover = contentEffect === "hover";

	const selectedTab = isHover
		? backgroundStyle?.hoverType || "transparent"
		: backgroundStyle?.type || "transparent";

	// Each state+type combo has its own background key
	const activeBackground = isHover
		? selectedTab === "gradient"
			? backgroundStyle?.hoverGradientBackground
			: backgroundStyle?.hoverSolidBackground
		: selectedTab === "gradient"
			? backgroundStyle?.gradientBackground
			: backgroundStyle?.solidBackground;

	const handleTab = (tabName) => {
		const key = isHover ? "hoverType" : "type";
		onChange({ ...backgroundStyle, [key]: tabName });
	};

	const handleColorChange = (value) => {
		const key = isHover ? "hoverSolidBackground" : "solidBackground";
		onChange({ ...backgroundStyle, [key]: value });
	};

	const handleGradientChange = (value) => {
		const key = isHover ? "hoverGradientBackground" : "gradientBackground";
		onChange({ ...backgroundStyle, [key]: value });
	};


	const renderBackgroundControl = () => {
		switch (selectedTab) {
			case "solid":
				return (
					<CustomColorPicker
						label="Solid Color"
						value={activeBackground || "#fff"}
						onChange={handleColorChange}
					/>
				);
			case "gradient":
				return (
					<GradientBackground
						value={activeBackground}
						onChange={handleGradientChange}
					/>
				);
			case "transparent":
			default:
				return null;
		}
	};

	return (
		<>
			<div className="background-style">
				<span>{label}</span>
				<div className="background-style__buttons">
					{backGroundStyles.map(({ name, icon: Icon, label: btnLabel }) => (
						<button
							key={name}
							className={`background-style__btn ${selectedTab === name ? "active" : ""
								}`}
							onClick={() => handleTab(name)}
							title={btnLabel}
						>
							<Icon />
							<span>{btnLabel}</span>
						</button>
					))}
				</div>
			</div>
			{renderBackgroundControl()}
		</>
	);
}

export default BackgroundStyle;