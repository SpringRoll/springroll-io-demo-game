export const SCENE = Object.freeze(
{
    LOADING: 'loading',
    TITLE: 'title',
    PLATFORM: 'platform',
    RESULT: 'result',
    PAUSE: 'pause'
});

export const PLUGIN_NAME = Object.freeze(
{
    SPRINGROLL_APPLICATION: "springroll-phaser-plugin",
    CAPTIONS: "captions-plugin",
    FACTORY: 'factory-plugin',
    RESIZE: 'resize-plugin'
});

export const GAMEPLAY = Object.freeze(
{
    INITIAL_SCENE: SCENE.LOADING,
    WIDTH: 640,
    HEIGHT: 480,
    GRAVITY: 350
});

export const PATHS = Object.freeze(
{
    default: 'es',
    locales:
    {
        'en': { path: 'assets/en/' },
        'es': { path: 'assets/es/' }
    }
});

export const SPEECH = Object.freeze(
{
    volume: 0.4,
    rate: 1.2,
    pitch: 0,
    voice: 0
});