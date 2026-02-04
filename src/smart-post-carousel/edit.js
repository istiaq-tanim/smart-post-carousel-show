
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { PanelProvider, TabProvider } from '../context';
import Inspector from '../components/Inspector/Inspector';
export default function Edit({attributes,setAttributes}) {
	return (
		<>
		<PanelProvider>
                <TabProvider>
									<Inspector
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
								</TabProvider>
    </PanelProvider>
		{/* Block Content */}
		<p { ...useBlockProps() }>
			{ __(
				'Smart Post Carousel – hello from the editor!',
				'smart-post-carousel'
			) }
		</p>
		</>
	);
}
