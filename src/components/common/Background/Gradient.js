import { GradientPicker } from "@wordpress/components";

function GradientBackground({ value, onChange }) {
	const DEFAULT_GRADIENT =
		"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)";
	const gradientValue =
		value && typeof value === "string" && value.includes("gradient")
			? value
			: DEFAULT_GRADIENT;
	return (
		<div className="background-gradient-picker">
			<GradientPicker
				value={gradientValue}
				clearable={false}
				onChange={onChange}
				gradients={[
					{
						name: "JShine",
						gradient:
							"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
						slug: "jshine",
					},
					{
						name: "Moonlit Asteroid",
						gradient:
							"linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
						slug: "moonlit-asteroid",
					},
					{
						name: "Rastafarie",
						gradient:
							"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
						slug: "rastafari",
					},
					{
						gradient:
							"linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%)",
						name: "Cool to warm spectrum",
						slug: "cool-to-warm-spectrum",
					},
					{
						gradient:
							"linear-gradient(135deg,hsl(200, 100%, 50%) 0%,hsl(280, 100%, 60%) 100%)",
						name: "HSL blue to purple",
						slug: "hsl-blue-to-purple",
					},
					{
						gradient:
							"linear-gradient(135deg,hsla(120, 100%, 40%, 0.85) 0%,hsla(0, 100%, 50%, 0.85) 100%)",
						name: "HSLA green to red",
						slug: "hsla-green-to-red",
					},
				]}
			/>
		</div>
	);
}

export default GradientBackground;
