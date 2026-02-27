import AuthorMeta from "../AuthorMetaItem";
import MetaItem from "../MetaItem";
import { ReadingTime } from "../ReadingTime";

const getMetaElement = (
	item,
	{
		author,
		authorAvatar,
		authorDisplayStyle,
		postDate,
		commentsCount,
		views,
		likes,
		post,
		attributes,
		orientation,
		authorIcon,
		dateFormat,
		metaColor,
		metaTypo,
	},
) => {
	switch (item.value) {
		case "author":
			return (
				<AuthorMeta
					key="author"
					typo={metaTypo}
					author={author}
					authorAvatar={authorAvatar}
					authorIconStyle={authorIcon}
					authorDisplayType={authorDisplayStyle}
					color={metaColor}
				/>
			);
		case "date":
			return orientation !== "orientation_two" ? (
				<MetaItem
					key="date"
					color={metaColor}
					typo={metaTypo}
					icon="date"
					text={dateFormat === "timeAgo" ? postDate.timeAgo : postDate.meta}
				/>
			) : null;
		case "comments":
			return (
				<MetaItem
					key="comments"
					color={metaColor}
					typo={metaTypo}
					icon="comments"
					text={commentsCount}
				/>
			);
		case "views":
			return (
				<MetaItem
					key="views"
					color={metaColor}
					icon="views"
					typo={metaTypo}
					text={views}
				/>
			);
		case "likes":
			return (
				<MetaItem key="likes" color={metaColor} icon="likes" text={likes} />
			);
		case "reading-time":
			return (
				<ReadingTime
					key="reading-time"
					typo={metaTypo}
					color={metaColor}
					content={post.content}
					attributes={attributes}
				/>
			);
		default:
			return null;
	}
};

export default getMetaElement;
