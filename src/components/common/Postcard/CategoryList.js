export default function CategoryList({ categories, className = "" }) {
	if (!categories || categories.length === 0) {
		return null;
	}
	return (
		<div className="sp-smart-post-carousel-category">
			<ul className={`sp-smart-post-carousel-category-list ${className}`}>
				{categories.map((category) => (
					<li
						key={category.term_id}
						className="sp-smart-post-carousel-category-list-item"
					>
						<a
							href={`/category/${category.slug}`}
							className="sp-smart-post-carousel-category-list-badge"
							title={category?.cat_name}
						>
							{category?.cat_name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
