import Phaser from 'phaser';
import { Application, CaptionPlayer, HtmlRenderer, Debugger } from 'springroll';

export class SpringrollPlugin extends Phaser.Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);

        this.app = new Application(
        {
           features:{
                captions: true,
                sound: true,
                sfx: true
            }
        });

        // this is just to transform some springroll events
        // to be unified with the way they're typically handled in phaser.  
        this.events = new Phaser.Events.EventEmitter();

        const debugEvents = [
            "captionStart",
            "speechSynthStart",
            "localizerResolve",
            "pauseScreenActive",
            "soundMute"
        ]
        for (let i = 0; i < debugEvents.length; i++)
        {
            const name = debugEvents[i];
            this.events.on(name, (data) =>
            {
                Debugger.log('info', `${name} emit`, data);
                this.app.container.send(name, data);
            });
        }
        // --- 

        this.app.state.pause.subscribe((isPaused) =>
        {
            Debugger.log('info', '[SPRINGROLL]', `paused: ${isPaused}`);
            this.events.emit('pause', isPaused);
        });

        this.app.state.captionsMuted.subscribe((isMuted) =>
        {
            Debugger.log('info', '[SPRINGROLL]', `captions muted: ${isPaused}`);
            this.captionsMuted = isMuted;
            if (isMuted)
            {
                this.stopCaption();
            }
        });

        this.app.state.soundVolume.subscribe((value) =>
        {
            const volume = Math.min(1, Math.max(value, 0));
            if (volume === 0)
            {
                // These are just for compatibility with springroll.io page events to display if the game is muted.
                this.events.emit('soundMute', true);
            }
            else
            {
                this.events.emit('soundMute', false);
            }
            this.game.sound.volume = volume;
        });

        this.app.state.sfxVolume.subscribe((value) =>
        {
            const volume = Math.min(1, Math.max(value, 0));
            if (volume === 0)
            {
                this.events.emit('sfxMute', true);
            }
            else
            {
                this.events.emit('sfxMute', false);
            }

            this.events.emit('sfxVolume', volume);
        });
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

    update(time, delta)
    {
        if (this.captionPlayer)
        {
            this.captionPlayer.update(delta / 1000);
        }
    }

    setCaptionData(captionData)
    {
        const captionsElement = document.getElementById("caption");
        this.captionPlayer = new CaptionPlayer(captionData, new HtmlRenderer(captionsElement));
    }

    playCaption(name, startTime, options)
    {
        if (!this.captionPlayer || this.captionsMuted)
        {
            Debugger.log('warn', '[SPRINGROLL]', 'tried to play caption before CaptionPlayer data set.');
            return;
        }

        this.events.emit('captionStart', { name: name, time: startTime, options: options });
        this.captionPlayer.start(name, startTime, options);
    }

    stopCaption()
    {
        if (!this.captionPlayer)
        {
            return;
        }

        this.captionPlayer.stop();
    }
}