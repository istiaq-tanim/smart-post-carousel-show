import { backGroundStyles } from "../../../const";
import CustomColorPicker from "../CustomColorPicker/CustomColorPicker";
import GradientBackground from "./Gradient";

function BackgroundStyle({
	backgroundStyle,
	onChange,
	label = "Background Style",
}) {
	const selectedTab = backgroundStyle?.type || "transparent";

	const handleTab = (tabName) => {
		onChange({ ...backgroundStyle, type: tabName });
	};

	const handleColorChange = (value) => {
		onChange({ ...backgroundStyle, background: value });
	};

	const handleGradientChange = (value) => {
		onChange({ ...backgroundStyle, background: value });
	};

	const renderBackgroundControl = () => {
		switch (selectedTab) {
			case "solid":
				return (
					<CustomColorPicker
						label="Solid Color"
						value={backgroundStyle.background || "#ffffff"}
						onChange={handleColorChange}
					/>
				);
			case "gradient":
				return (
					<GradientBackground
						value={backgroundStyle.background}
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
							className={`background-style__btn ${
								selectedTab === name ? "active" : ""
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
