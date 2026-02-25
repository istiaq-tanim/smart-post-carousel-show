// Import Files
import md5 from "md5";

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

export const getPostDate = (post) => {
	let date = null;

	// API custom structured date
	if (post.post_date?.month && post.post_date?.day && post.post_date?.year) {
		date = new Date(
			`${post.post_date?.month}-${post.post_date?.day}-${post.post_date?.year}`,
		);
	}
	// WordPress default
	else if (post.date) {
		date = new Date(post.date);
	}

	// fallback
	else {
		dateObj = new Date();
	}

	return {
		day: date.toLocaleDateString("en-US", { day: "2-digit" }),
		month: date.toLocaleDateString("en-US", { month: "short" }),
		monthFull: date.toLocaleDateString("en-US", { month: "long" }),
		year: date.toLocaleDateString("en-US", { year: "numeric" }),

		full: date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		meta: date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}),
	};
};

// These effects need chunked posts
export const CHUNKED_EFFECTS = ["fade", "cube", "flip"];

export const EFFECT_MAP = {
	cover: "coverflow",
	fade: "fade",
	cube: "cube",
	flip: "flip",
};

// Chunk array into groups
export const arrayChunk = (array, size) => {
	const chunks = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
};

export const getGravatarUrl = (email, size = 48) => {
	if (!email) return "";
	const hash = md5(email.trim().toLowerCase());
	return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
};
