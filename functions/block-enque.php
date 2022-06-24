<?php
/**
 * Server-side rendering of my block. Extend it for others
 *
 * @package WordPress
 * @subpackage tf-theme
 * @since 1.0.1
 * @author Tommyfrog
 */
define('GUTENBERG_URI', 	get_template_directory_uri().	'/inc/blocks/' );

//load scripts
function tf_gutenberg_scripts() {
	//scripts and libary for gutenberg-blocks in editor and frontend
	global $version;
	wp_enqueue_script ( 'lottie-player',  	 GUTENBERG_URI. '/js/lottie-player.js', 	array('wp-blocks'), 		$version,	true);
	wp_enqueue_script ( 'lottie-ctrl',  	 GUTENBERG_URI. '/js/lottie-controls.js', 	array('lottie-player'),	 	$version, 	true);
}
add_action( 'enqueue_block_assets', 'tf_gutenberg_scripts');

//load block
function tf_enqueue_block_editor_assets() {

	$blocks = array(
		array(
			'name' => 'lottie-block', 
			'path' => 'lottie-player'
		),
		// extend it for morw
	);

	//loop through all blocks to load
	foreach($blocks as $block){
		wp_enqueue_script(
			$block['name'],
			GUTENBERG_URI . $block['path'].'/block.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', )
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'tf_enqueue_block_editor_assets' );
