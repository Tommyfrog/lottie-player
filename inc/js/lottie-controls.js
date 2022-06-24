/**
 * Functions for Play on Hover  see in inc/lottie-controls.js loaded by functions
 * Load by functions.php or similary wp_enqueue_script;
 * @devinfo --
 * @author Tommyfrog
 * @since 1.0.1
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
