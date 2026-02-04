
import { registerBlockType } from '@wordpress/blocks';


import './style.scss';

import Edit from './edit';
import metadata from './block.json';
import { PostCarouselBlockIcon } from './assets/icon';

registerBlockType( metadata.name, {
	edit: Edit,
	icon: <PostCarouselBlockIcon></PostCarouselBlockIcon>
} );
