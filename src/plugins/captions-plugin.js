import { CaptionPlayer, HtmlRenderer, CaptionFactory } from "springroll";

export class CaptionsPlugin extends Phaser.Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);

        const captionsElement = document.getElementById("caption");
        this.captionPlayer = new CaptionPlayer({}, new HtmlRenderer(captionsElement));
    }

    start()
    {
        this.game.events.on('step', this.update, this);
    }

    stop()
    {
        this.game.events.off('step', this.update, this);
        this.stopCaption();
    }

    setData(data)
    {
        this.captionPlayer.captions = CaptionFactory.createCaptionMap(data);
    }

    setMute(val)
    {
        if (val == true)
        {
            this.captionPlayer.stop();
        }
        this.isMuted = val;
    }

    playCaption(name, time = 0, args = {})
    {
        if (this.isMuted)
        {
            return;
        }
        this.captionPlayer.start(name, time, args);
    }

    stopCaption()
    {
        this.captionPlayer.stop();
    }

    update(time, delta)
    {
        this.captionPlayer.update(delta / 1000);
    }
}