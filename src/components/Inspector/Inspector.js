import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { usePanel } from "../../hooks/usePanel";
import General from "./../PostCarousel/General";
import Slider from "./../PostCarousel/Slider";
import QueryBuilder from "../QueryBuilder";
import NavigationGeneral from "../NavigationArrow/General";
import NavigationStyle from "../NavigationArrow/Style";
import PaginationGeneral from "../Pagination/General";
import PaginationStyle from "../Pagination/Style";
import ContentAreaGeneral from "../ContentArea/General";
import ContentAreaStyle from "../ContentArea/Style";
import ImageContentGeneral from "../ImageSection/General";
import ImageContentStyle from "../ImageSection/Style";
import TitleAreaGeneral from "../TitleArea/General";
import TitleAreaStyle from "../TitleArea/Style";
import TaxonomyGeneral from "../Taxonomy/General";
import TaxonomyStyle from "../Taxonomy/Style";
import MetaDataGeneral from "../MetaData/General";
import MetaDataStyle from "../MetaData/Style";
import ReadMoreGeneral from "../ReadMore/General";
import ReadMoreStyle from "../ReadMore/Style";
import ExcerptGeneral from "../Excerpt/General";
import ExcerptStyle from "../Excerpt/Style";
import SocialGeneral from "../SocialShare/General";
import SocialStyle from "../SocialShare/Style";

import { __ } from "@wordpress/i18n";
import CustomTabs from "../common/CustomTabs/CustomTabs";
import CustomToggle from "../common/CustomToggle/CustomToggle";

function Inspector({ attributes, setAttributes }) {
	const { openPanel, togglePanel } = usePanel();

	return (
		<InspectorControls>
			{/* Post Carousel Panel */}
			<PanelBody
				title="Post Carousel"
				opened={openPanel === "carousel"}
				onToggle={() => togglePanel("carousel")}
				initialOpen={true}
			>
				{openPanel === "carousel" && (
					<CustomTabs
						GeneralTab={General}
						SliderTab={Slider}
						attributes={attributes}
						setAttributes={setAttributes}
						displayIcon={true}
						initialTab="general"
					/>
				)}
			</PanelBody>

			{/* Query Builder Panel */}
			<PanelBody
				title="Query Builder"
				opened={openPanel === "query"}
				onToggle={() => togglePanel("query")}
			>
				{openPanel === "query" && (
					<QueryBuilder attributes={attributes} setAttributes={setAttributes} />
				)}
			</PanelBody>

			{/* Navigation Panel */}
			<PanelBody
				title="Navigation Arrow"
				opened={openPanel === "navigation"}
				onToggle={() => togglePanel("navigation")}
				initialOpen={true}
			>
				{openPanel === "navigation" && (
					<CustomTabs
						GeneralTab={NavigationGeneral}
						StyleTab={NavigationStyle}
						attributes={attributes}
						setAttributes={setAttributes}
						displayIcon={true}
						initialTab="general"
					/>
				)}
			</PanelBody>

			{/* Pagination Dots Panel */}

			<PanelBody
				title="Pagination Dots"
				opened={openPanel === "pagination"}
				onToggle={() => togglePanel("pagination")}
				initialOpen={true}
			>
				{openPanel === "pagination" && (
					<CustomTabs
						GeneralTab={PaginationGeneral}
						StyleTab={PaginationStyle}
						attributes={attributes}
						setAttributes={setAttributes}
						displayIcon={true}
						initialTab="general"
					/>
				)}
			</PanelBody>

			{/* Content Area*/}

			<PanelBody
				title="Content Area"
				opened={openPanel === "content"}
				onToggle={() => togglePanel("content")}
				initialOpen={true}
			>
				{openPanel === "content" && (
					<CustomTabs
						GeneralTab={ContentAreaGeneral}
						StyleTab={ContentAreaStyle}
						attributes={attributes}
						setAttributes={setAttributes}
						displayIcon={true}
						initialTab="general"
					/>
				)}
			</PanelBody>

			{/* Image and Video Panel */}

			<PanelBody
				title="Image and Video"
				opened={openPanel === "image"}
				onToggle={() => togglePanel("image")}
			>
				{openPanel === "image" && (
					<>
						<CustomToggle
							label={__("Show Featured Image", "smart-post-carousel")}
							value={attributes.showFeaturedImage}
							attributesKey="showFeaturedImage"
							setAttributes={setAttributes}
						/>
						{attributes.showFeaturedImage && (
							<CustomTabs
								GeneralTab={ImageContentGeneral}
								StyleTab={ImageContentStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>

			{/* Title */}

			<PanelBody
				title="Title"
				opened={openPanel === "title"}
				onToggle={() => togglePanel("title")}
			>
				{openPanel === "title" && (
					<>
						<CustomToggle
							label={__("Show Title", "smart-post-carousel")}
							value={attributes.showTitle}
							attributesKey="showTitle"
							setAttributes={setAttributes}
						/>
						{attributes.showTitle && (
							<CustomTabs
								GeneralTab={TitleAreaGeneral}
								StyleTab={TitleAreaStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>

			{/* Taxonomy */}

			<PanelBody
				title="Taxonomy"
				opened={openPanel === "taxonomy"}
				onToggle={() => togglePanel("taxonomy")}
			>
				{openPanel === "taxonomy" && (
					<>
						<CustomToggle
							label={__("Taxonomy", "smart-post-carousel")}
							value={attributes.showTaxonomy}
							attributesKey="showTaxonomy"
							setAttributes={setAttributes}
						/>
						{attributes.showTaxonomy && (
							<CustomTabs
								GeneralTab={TaxonomyGeneral}
								StyleTab={TaxonomyStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>

			{/* Meta Data */}

			<PanelBody
				title="Meta Data"
				opened={openPanel === "metadata"}
				onToggle={() => togglePanel("metadata")}
			>
				{openPanel === "metadata" && (
					<>
						<CustomToggle
							label={__("Meta data", "smart-post-carousel")}
							value={attributes.showMetaData}
							attributesKey="showMetaData"
							setAttributes={setAttributes}
						/>
						{attributes.showMetaData && (
							<CustomTabs
								GeneralTab={MetaDataGeneral}
								StyleTab={MetaDataStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>

			{/* Excerpt */}

			<PanelBody
				title="Excerpt"
				opened={openPanel === "excerpt"}
				onToggle={() => togglePanel("excerpt")}
			>
				{openPanel === "excerpt" && (
					<>
						<CustomToggle
							label={__("Excerpt", "smart-post-carousel")}
							value={attributes.showExcerpt}
							attributesKey="showExcerpt"
							setAttributes={setAttributes}
						/>
						{attributes.showExcerpt && (
							<CustomTabs
								GeneralTab={ExcerptGeneral}
								StyleTab={ExcerptStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>

			{/* Read More */}

			<PanelBody
				title="Read More"
				opened={openPanel === "readMore"}
				onToggle={() => togglePanel("readMore")}
			>
				{openPanel === "readMore" && (
					<>
						<CustomToggle
							label={__("Read More Button", "smart-post-carousel")}
							value={attributes.showReadMore}
							attributesKey="showReadMore"
							setAttributes={setAttributes}
						/>
						{attributes.showReadMore && (
							<CustomTabs
								GeneralTab={ReadMoreGeneral}
								StyleTab={ReadMoreStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>

			{/* Social Share */}

			<PanelBody
				title="Social Share"
				opened={openPanel === "socialShare"}
				onToggle={() => togglePanel("socialShare")}
			>
				{openPanel === "socialShare" && (
					<>
						<CustomToggle
							label={__("Social Share", "smart-post-carousel")}
							value={attributes.showSocialShare}
							attributesKey="showSocialShare"
							setAttributes={setAttributes}
						/>
						{attributes.showSocialShare && (
							<CustomTabs
								GeneralTab={SocialGeneral}
								StyleTab={SocialStyle}
								attributes={attributes}
								setAttributes={setAttributes}
								displayIcon={true}
								initialTab="general"
							/>
						)}
					</>
				)}
			</PanelBody>
		</InspectorControls>
	);
}

export default Inspector;
