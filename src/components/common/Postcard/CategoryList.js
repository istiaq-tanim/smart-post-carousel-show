export default function CategoryList({ categories }) {
	if (!categories || categories.length === 0) {
		return null;
	}

	return (
		<ul className="sp-category-list">
			{categories.map((category) => (
				<li key={category.term_id} className="sp-category-list__item">
					<a
						href={`/category/${category.slug}`}
						className="sp-category-list__badge"
						title={category.name}
					>
						{category.name}
					</a>
				</li>
			))}
		</ul>
	);
}
