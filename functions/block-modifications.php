<?php
/**
 * Server-side rendering of my block. Extend it for others
 *
 * @package WordPress
 * @subpackage tf
 * @since 1.0.1
 * @author Tommyfrog
 */
define('GUTENBERG_URI', 	get_template_directory_uri().	'/inc/blocks/' );

function tf_enqueue_block_editor_assets() {

	$gutenbergModules = array(
		array(
			'name' => 'lottie-block', 
			'path' => 'lottie-player'
		),
		
	);

	foreach($gutenbergModules as $gutenbergModule){
		wp_enqueue_script(
			$gutenbergModule['name'],
			GUTENBERG_URI . $gutenbergModule['path'].'/block.js',
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', )
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'tf_enqueue_block_editor_assets' );