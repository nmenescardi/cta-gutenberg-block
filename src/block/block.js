/**
 * BLOCK: nm-cta
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
//const { PlainText } = wp.editor;
const { RichText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-nm-cta', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Custom CTA' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'nm-cta — CGB Block' ),
		__( '' ),
		__( '' ),
	],
	attributes: {
		message: {
			type: 'array',
			source: 'children',
			selector: '.message-body',
		}
	},
	edit: props => {
		const { attributes: { message }, className, setAttributes } = props;
		const onChangeMessage = message => { setAttributes( { message } ) };
		return (
			<div className={ className }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Financial independence that you can count on', 'nm-cta' ) }
					  onChange={ onChangeMessage }
					  value={ message }
				  />
				  <a href="#">JOIN US</a>
			</div>				
		);
	},
	save: props => {
		const { attributes: { message } } = props;
		return (
			<div>
				<h2>{ __( 'Call to Action', 'nm-cta' ) }</h2>
				<div class="message-body">
					{ message }
				</div>
			</div>
		);
	},
} );
