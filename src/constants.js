export const SCENE = Object.freeze(
{
    LOADING: 'loading',
    TITLE: 'title',
    PLATFORM: 'platform',
    RESULT: 'result',
    PAUSE: 'pause'
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