import { userIcons } from "../../../../const";
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
	},
) => {
	switch (item.value) {
		case "author":
			return (
				<AuthorMeta
					key="author"
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
					icon="date"
					text={dateFormat === "timeAgo" ? postDate.timeAgo : postDate.meta}
				/>
			) : null;
		case "comments":
			return <MetaItem key="comments" icon="comments" text={commentsCount} />;
		case "views":
			return <MetaItem key="views" icon="views" text={views} />;
		case "likes":
			return <MetaItem key="likes" icon="likes" text={likes} />;
		case "reading-time":
			return (
				<ReadingTime
					key="reading-time"
					content={post.content}
					attributes={attributes}
				/>
			);
		default:
			return null;
	}
};

export default getMetaElement;
