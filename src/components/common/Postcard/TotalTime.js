import { countWordAndCharacter } from "../../../../utils";

export const TotalTime = ({ content, metaPrefix, metaPerMin }) => {
	const { words, chars } = countWordAndCharacter(content);

	const unit = metaPerMin?.unit || "words";
	const perMin = Number(metaPerMin?.value || 200);

	const total = unit === "chars" ? chars : words;

	const minutes = Math.max(1, Math.ceil(total / perMin));

	return (
		<>
			{minutes} Min {metaPrefix}
		</>
	);
};
