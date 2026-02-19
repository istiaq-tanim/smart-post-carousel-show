import {
	DecreaseButton,
	IncreaseButton,
} from "../../../smart-post-carousel/assets/icon";

function NumberControl({ value = 0, onChange = () => {}, min, max, step = 1 }) {
	const handleChange = (e) => {
		const inputValue = e.target.value;

		// Allow empty input for better UX
		if (inputValue === "") {
			onChange(0);
			return;
		}

		let newValue = parseInt(inputValue, 10);

		// Handle Invalid value minimum value and maximum value
		if (isNaN(newValue)) {
			newValue = 0;
		}
		if (min !== undefined && newValue < min) {
			newValue = min;
		}
		if (max !== undefined && newValue > max) {
			newValue = max;
		}
		onChange(newValue);
	};

	const increment = () => {
		let newValue = value + step;
		if (max !== undefined && newValue > max) {
			newValue = max;
		}
		onChange(newValue);
	};

	const decrement = () => {
		let newValue = value - step;
		if (min !== undefined && newValue < min) {
			newValue = min;
		}
		onChange(newValue);
	};

	return (
		<div className="input-box">
			<div className="input-with-spinner">
				<input
					type="number"
					value={value}
					onChange={handleChange}
					min={min}
					max={max}
					step={step}
				/>
				<div className="spinner-control">
					<button type="button" onClick={increment}>
						<IncreaseButton />
					</button>
					<button type="button" onClick={decrement}>
						<DecreaseButton />
					</button>
				</div>
			</div>
		</div>
	);
}

export default NumberControl;
