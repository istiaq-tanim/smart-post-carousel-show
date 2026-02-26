function Input({ label, value, onChange = () => {}, step = 1 }) {
	const handleChange = (e) => {
		const newValue = e.target.value;
		onChange(newValue);
	};
	return (
		<div style={{ marginTop: "16px" }}>
			<label
				style={{
					display: "block",
					marginBottom: "8px",
					fontSize: "13px",
					fontWeight: "500",
					color: "#1e1e1e",
				}}
			>
				{label}
			</label>
			<input
				type="number"
				step={step}
				value={value}
				onChange={handleChange}
				style={{
					width: "100%",
					border: "1px solid #ddd",
					fontSize: "14px",
					outline: "none",
					transition: "border-color 0.2s",
				}}
				onFocus={(e) => {
					e.target.style.borderColor = "#6f22dd";
					e.target.style.boxShadow = "0 0 0 1px #6f22dd";
				}}
				onBlur={(e) => {
					e.target.style.borderColor = "#ddd";
					e.target.style.boxShadow = "none";
				}}
			/>
		</div>
	);
}

export default Input;
