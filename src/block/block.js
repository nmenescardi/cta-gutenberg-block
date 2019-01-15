/**
 * BLOCK: nm-cta
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import icon from './icon';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.block
const { Fragment } = wp.element;
//const { PlainText } = wp.editor;
const { RichText, URLInput } = wp.editor;
const {
    IconButton,
    Tooltip,
    TextControl,
} = wp.components;

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
	title: __( 'Custom CTA', 'nm-cta' ), // Block title.
	//icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	icon: {
		background: 'rgba(254, 243, 224, 0.52)',
		src: icon,
	},
	keywords: [
		__( 'Custom CTA' ),
		__( 'CTA' ),
	],
	attributes: {
		ctaTitle: {
			type: 'array',
			source: 'children',
			selector: '.ctaTitle-body',
		},
		text: {
			type: 'string',
			source: 'text',
			selector: 'a',
		},
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
	},
	edit: props => {
		const { attributes: { ctaTitle, text, url }, className, isSelected, setAttributes } = props;
		const onChangeCtaTitle = ctaTitle => { setAttributes( { ctaTitle } ) };
		return (
			<div className={ className }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Financial independence that you can count on', 'nm-cta' ) }
					onChange={ onChangeCtaTitle }
					value={ ctaTitle }
				  />

					{ isSelected ? (

						<Fragment>
							<TextControl
								id="example-input-field"
								label={ __( 'Link Text', 'nm-cta' ) }
								value={ text }
								onChange={ text => setAttributes( { text } ) }
							/>
							<p>{ __( 'Link URL', 'nm-cta' ) }</p>
							<form
								className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
								onSubmit={ event => event.preventDefault() }
							>
								<Tooltip text="Add Link">
									{icon}
								</Tooltip>
								<URLInput
									className="url"
									value={ url }
									onChange={ url => setAttributes( { url } ) }
								/>
								<IconButton
									icon="editor-break"
									label={ __( 'Apply', 'nm-cta' ) }
									type="submit"
								/>
							</form>
						</Fragment>

					) : (

						<p>
							<a href={ url }>
								{ text || __( 'Edit link', 'nm-cta' ) }
							</a>
						</p>

					)}
			</div>				
		);
	},
	save: props => {
		const { attributes: { ctaTitle, text, url } } = props;
		return (
			<div>
				<div class="ctaTitle-body">{ ctaTitle }</div>
				<div class="cta-link"><div class="link-wrapper"><a href={ url }>{ text }</a></div></div>
			</div>
		);
	},
} );
