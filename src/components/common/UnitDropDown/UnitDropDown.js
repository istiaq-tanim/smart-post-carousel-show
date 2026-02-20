import "./editor.scss";
function UnitDropdown({ value = "px", onChange, options = ["px", "%", "em"] }) {
	return (
		<div className="sp-smart-post-carousel-units">
			<span className="box-unit">{value}</span>
			<div className="sp-smart-post-carousel-units-btn">
				<div className="sp-smart-post-carousel-units-btn-inner">
					{" "}
					{/* 👈 wrap */}
					{options.map((option) => (
						<button
							key={option}
							className={value === option ? "active" : ""}
							onClick={() => onChange(option)}
						>
							{option}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default UnitDropdown;
