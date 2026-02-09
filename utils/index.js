export const stripComments = (content = "") => {
	if (!content) return "";

	return content
		.replace(/<!--\s*wp:[\s\S]*?-->/g, "")
		.replace(/<!--\s*\/wp:[\s\S]*?-->/g, "")

		.replace(/<\/?[^>]+>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/\s+/g, " ")
		.trim();
};

export const countWordAndCharacter = (content = "") => {
	const text = stripComments(content);

	return {
		words: text ? text.split(" ").length : 0,
		chars: text.length,
	};
};
