import { CaptionPlayer, HtmlRenderer, CaptionFactory, BellhopSingleton } from "springroll";

export class CaptionsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.captionsElement = document.getElementById("captions");
        this.captionPlayer = new CaptionPlayer({}, new HtmlRenderer(this.captionsElement));
    }

    start() {
        this.game.events.on('step', this.update, this);
    }

    stop() {
        this.game.events.off('step', this.update, this);
        this.stopCaption();
    }

    setData(data) {
        this.captionPlayer.captions = CaptionFactory.createCaptionMap(data);
    }

    setMute(muted) {
        this.captionsElement.style.display = this.captionsMuted ? 'none' : 'block';
        this.muted = muted;
    }

    playCaption(name, time = 0, args = {}) {
        if (this.muted) {
            return;
        }
        this.captionPlayer.start(name, time, args);
    }

    stopCaption() {
        this.captionPlayer.stop();
    }

    update(time, delta) {
        this.captionPlayer.update(delta / 1000);
    }
}