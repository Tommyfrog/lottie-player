/**
 * Lottieplayer 
 * @see https://github.com/LottieFiles/lottie-player
 * 
 * @devinfo --
 * @author Tommyfrog
 * @since 1.0.0
 * 
 */
const { assign} = lodash;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { addFilter } = wp.hooks;

const { createHigherOrderComponent, withState } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings, MediaUpload, MediaUploadCheck  } = wp.blockEditor;
const { PanelBody, Panel, PanelRow, Button,  SelectControl, TextControl, FormToggle, ToggleControl, RangeControl, ColorPalette } = wp.components;

//Media Select Tut https://www.liip.ch/en/blog/add-an-image-selector-to-a-gutenberg-block
//official Lottie Player https://lottiefiles.com/web-player
//import "@lottiefiles/lottie-player"; by functions.php
import classnames from 'classnames';

// Available contenttype control options, conrolled by json
const lottieModeOptions = [
    { label: __('Normal','tf'),     value: 'normal' },
    { label: __('Ping Pong','tf'),   value: 'bounce' }
];

// Enable contenttype control on the following blocks
const ALLOWED_BLOCKS = [
    'tf-theme/lottie-block', 
];
const ALLOWED_MEDIA_TYPES  = [     
    'application/json'
];
/**
 * Add contenttype control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */

/**
 * Register block
 */
 registerBlockType( 'tf-theme/lottie-block', {
    title: __( 'Lottie-Player', 'tf' ),
    icon: 'player',
    category: 'tf',
    keywords: [__( 'lottie', 'tf' ), __('player','tf')],

    attributes: {
        mediaId:                {   type: 'number', default: 0},
        lottieJson:             {   type: 'string', default: 'https://assets1.lottiefiles.com/packages/lf20_kqfglvmb.json'},
        lottieAutoplay:         {   type: 'boolean', default: true},
        lottieHoverplay:        {   type: 'boolean', default: false},
        lottieBackgroundColor:  {   type: 'string', default: 'transparent'},
        lottieHover:            {   type: 'boolean', default: false},
        lottieMode:             {   type: 'string', default: lottieModeOptions[ 0 ].value},
        lottieSpeed:            {   type: 'number', default: 1},
        lottieWidth:            {   type: 'number', default: 320},
        lottieHeight:           {   type: 'number', default: 320},
    },

    edit: ( props ) => {
        const { 
            attributes: {
                mediaId,
                lottieJson, 
                lottieAutoplay,
                lottieHoverplay,
                lottieControls,
                lottieBackgroundColor,
                lottieWidth,
                lottieHeight,
            },
            className,
            setAttributes
    } = props;

        return <lottie-player
                    autoplay={lottieAutoplay}
                    controls = {lottieControls}
                    loop
                    className={ lottieHoverplay == true ? 'lottie-hoverEffects' : '' }
                    mode="normal"
                    data-media={mediaId}
                    src={lottieJson}
                    style={{
                        width: lottieWidth + 'px',
                        height: lottieHeight + 'px',
                        backgroundColor: lottieBackgroundColor,
                    }}
                >
                    <i>Lottie-JSON will be loaded</i>
                </lottie-player>   
    },
    save: ( props ) => {
        const { 
            attributes: {
                mediaId,
                lottieJson,
                lottieControls,
                lottieAutoplay,
                lottieHoverplay,
                lottieSpeed,
                lottieMode,
                lottieDirection,
                lottieBackgroundColor,
                lottieWidth,
                lottieHeight,
            },
            className,
            setAttributes
        } = props;

        return <lottie-player
                    autoplay={lottieAutoplay}
                    className={ lottieHoverplay == true ? 'lottie-hoverEffects' : '' }
                    controls = {lottieControls}
                    loop
                    mode="normal"
                    data-media={mediaId}
                    src={lottieJson}
                    style={{
                        width: lottieWidth + 'px',
                        height: lottieHeight + 'px',
                        backgroundColor: lottieBackgroundColor,
                    }}
                >
                    <i>Lottie-JSON will be loaded</i>
                </lottie-player>   
    }
 });

/**
 * Create HOC to add content type control to inspector controls of block.
 * 
 * @returns {object} Modified block.
 */
const withInspectorControls =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
        // Do nothing if it's another block than our defined ones.
        if ( ! ALLOWED_BLOCKS.includes( props.name ) ) {
            return <BlockEdit { ...props } />
        }

        const { 
            attributes: {
                mediaId,
                lottieJson,
                lottieControls,
                lottieAutoplay,
                lottieHoverplay,
                lottieSpeed,
                lottieMode,
                lottieDirection,
                lottieBackgroundColor,
                lottieWidth,
                lottieHeight,               
            },
            setAttributes
        } = props;

        const instructions = <p>{ __( 'To edit Jottiefile, you need permission to upload media.', 'tf' ) }</p>;

        //define Control UI & Options
        return (
            <Fragment>
                <BlockEdit { ...props } />

                <InspectorControls>
                    <Panel>
                        <PanelBody  
                            title={__('Jottiefile','tf')} 
                            initialOpen={ true }
                            label={__('Further Infos in Jottiefile','tf')}>
                            
                            <MediaUploadCheck fallback={ instructions }>
                                <MediaUpload
                                    onSelect={ ( media ) =>
                                        //console.log( 'selected ' , media ),
                                        // replaces protocol from url, for no-conflict with mixed https content 
                                        setAttributes({ 
                                            mediaId: media.id , 
                                            lottieJson:media.url.replace(/(^\w+:|^)/, '')
                                        }) 
                                    }
                                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                                    value={ mediaId }
                                    render={ ( { open } ) => (
                                        <Button 
                                            className={mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                                            onClick={ open }>
                                                { __('Choose an jottiefile (JSON)', 'tf')}
                                        </Button>
                                    ) }
                                />
                            </MediaUploadCheck>
                            {mediaId != 0 && 
                                <MediaUploadCheck>
                                    <Button 
                                        onClick={( media ) => 
                                            setAttributes({ 
                                                mediaId: 0, 
                                                lottieJson:'' 
                                            })
                                        } 
                                        isLink isDestructive>
                                            {__('Remove jottiefile', 'tf')}
                                        </Button>
                                </MediaUploadCheck>
                            }

                            <ToggleControl
                                label={ __('aktiviere Autoplay?','tf') }
                                help={ lottieAutoplay ? __('Autoplay aktiv','tf') : __('kein Autoplay','tf') }
                                checked={ lottieAutoplay }
                                onChange={ () => setAttributes({ lottieAutoplay: ! lottieAutoplay }) }
                            />
                            <ToggleControl
                                label={ __('Hoverfunktion','tf') }
                                help={ lottieHoverplay ? __('Play bei Mouseover','tf') : __('Play Allways','tf') }
                                checked={ lottieHoverplay }
                                onChange={ () => setAttributes({ lottieHoverplay: ! lottieHoverplay }) }
                            />
                             <ToggleControl
                                label={ __('Zeige Controls','tf') }
                                help={ lottieControls ? __('Zeige Controls an','tf') : __('Zeige Controls verbergen','tf') }
                                checked={ lottieControls }
                                onChange={ () => setAttributes({ lottieControls: ! lottieControls }) }
                            />
                            <ToggleControl
                                label={ __('Abspielrichtung','tf') }
                                help={ lottieDirection ? __('Vorwärts','tf') : __('Rückwärts','tf') }
                                checked={ lottieDirection }
                                onChange={ () => setAttributes({ lottieDirection: ! lottieDirection }) }
                            /> 
                            <SelectControl
                                label={ __('Modus','tf') }
                                value={ lottieMode }
                                options={ lottieModeOptions }                                
                                onChange={ ( value ) => setAttributes({ lottieMode: value }) }
                            />                            
                            <RangeControl
                                label={ __('Geschwindigkeit in 1x','tf') }
                                allowReset
                                resetFallbackValue = { 1 }
                                value={ lottieSpeed }
                                onChange={ ( value ) => setAttributes({ lottieSpeed: value }) }
                                min={ -1 }
                                max={ 10 }
                                step={1}
                            />
                            <RangeControl
                                label={ __( 'Width in px','tf' ) }
                                allowReset
                                resetFallbackValue = { 0 }
                                value={ lottieWidth }
                                onChange={ ( value ) => setAttributes({ lottieWidth: value }) }
                                min={ 0 }
                                max={ 1000 }
                                step={10}
                            /> 
                            <RangeControl
                                label={ __( 'Height in px','tf' ) }
                                allowReset
                                resetFallbackValue = { 0 }
                                value={ lottieHeight }
                                onChange={ ( value ) => setAttributes({ lottieHeight: value }) }
                                min={ 0 }
                                max={ 1000 }
                                step={10}
                            />                           
                            <PanelColorSettings
                                title={ __( 'Farbeinstellungen', 'tf' ) }
                                initialOpen={ false }
                                colorSettings={ [
                                    {
                                        value: lottieBackgroundColor,
                                        onChange: ( lottieBackgroundColor ) =>  setAttributes( { lottieBackgroundColor } ),
                                        label:  __('Hintergrundfarbe','tf'),
                                    }
                                ] } />
                                                      
                        </PanelBody>                                      
                    </Panel>
                </InspectorControls>

            </Fragment>
        );
    };
}, "withInspectorControl" );
addFilter( 'editor.BlockEdit', 'tf/lottie-block', withInspectorControls );

/*
 * Functions for Play on Hover  see in inc/lottie-controls.js loaded by functions
 */
const lottieplayerContainers = document.querySelectorAll(".lottie-hoverEffects");
lottieplayerContainers.forEach(player => {
    //play
    player.addEventListener("mouseover", () => {
        player.play();
    });
    //stop or pause
    player.addEventListener("mouseleave", () => {
        player.pause();
    });
});