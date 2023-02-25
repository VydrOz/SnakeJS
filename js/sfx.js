export default class Sfx extends Audio {
    
    constructor(path, volume) {
        super(path);
        this.volume = volume;
    }

    play() {
        this.pause();
        this.currentTime = 0;
        super.play();
    }

    setVolume(volume) {
        this.volume = volume;
    }
}