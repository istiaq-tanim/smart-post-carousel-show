function Divider({ top = "" }) {
	return (
		<span
			style={{
				display: "block",
				width: "100%",
				borderBottom: "1px solid #ddd",
				marginLeft: "auto",
				marginRight: "auto",
				marginBottom: "12px",
				...(top && { marginTop: top }),
				opacity: 0.6,
			}}
		></span>
	);
}

export default Divider;
