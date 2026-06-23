import { Howl } from 'howler';

class AudioManager {
  private music: Howl | null = null;
  private hoverSound: Howl | null = null;
  private popSound: Howl | null = null;
  private errorSound: Howl | null = null;
  private whooshSound: Howl | null = null;

  private lastHoverTime = 0;
  private lastWhooshTime = 0;
  private lastWhooshDirection: string | null = null;
  private isMusicMuted = false;

  constructor() {
    this.init();
  }

  private init() {
    const cb = Date.now();

    // 1. Background Music: looping, streaming, starting at 0 volume for fade in
    this.music = new Howl({
      src: [`/sfx/BG_music_ST.mp3?v=${cb}`],
      loop: true,
      volume: 0,
      html5: false, // Use Web Audio API for reliable fading
      preload: true
    });



    // 3. Hover sound: short subtle tick for interactions
    this.hoverSound = new Howl({
      src: [`/sfx/hover-sound.mp3?v=${cb}`],
      loop: false,
      volume: 0.18,
      preload: true
    });

    // 4. Pop sound: button / major CTA clicks
    this.popSound = new Howl({
      src: [`/sfx/pop-sound.mp3?v=${cb}`],
      loop: false,
      volume: 0.35,
      preload: true
    });

    // 5. 404 sound: triggers once per 404 page entry
    this.errorSound = new Howl({
      src: [`/sfx/404-error-sound.mp3?v=${cb}`],
      loop: false,
      volume: 0.4,
      preload: true
    });

    // 6. Whoosh sound: Section 2 gallery drag actions
    this.whooshSound = new Howl({
      src: [`/sfx/whoosh-sound.mp3?v=${cb}`],
      loop: false,
      volume: 0.3,
      preload: true
    });
  }

  playLoader() {
    // The user specifically requested hover sound to come when loader starts
    if (this.hoverSound) {
      this.hoverSound.stop();
      this.hoverSound.play();
    }
  }

  startMusicFadeIn() {
    if (this.music) {
      if (!this.music.playing()) {
        this.music.once('play', () => {
          this.music?.fade(0, 0.35, 2000);
        });
        this.music.play();
      } else {
        this.music.fade(this.music.volume(), 0.35, 2000);
      }
    }
  }

  stopMusicFadeOut() {
    if (this.music && this.music.playing()) {
      const currentVol = this.music.volume();
      this.music.fade(currentVol, 0, 1500);
      
      const onFadeComplete = () => {
        if (this.music && this.music.volume() === 0) {
          this.music.pause();
        }
        this.music?.off('fade', onFadeComplete);
      };
      
      this.music.on('fade', onFadeComplete);
    }
  }

  playHover() {
    const now = Date.now();
    // 90ms short cooldown to prevent sound overlap/spam during swift mouse movements
    if (now - this.lastHoverTime > 90) {
      if (this.hoverSound) {
        this.hoverSound.stop();
        this.hoverSound.play();
      }
      this.lastHoverTime = now;
    }
  }

  playPop() {
    if (this.popSound) {
      this.popSound.stop();
      this.popSound.play();
    }
  }

  play404() {
    if (this.errorSound) {
      this.errorSound.stop();
      this.errorSound.play();
    }
  }

  playWhoosh(direction: 'up' | 'down' | 'left' | 'right') {
    const now = Date.now();
    const isDirectionChange = this.lastWhooshDirection !== direction;
    const isCooldownExpired = now - this.lastWhooshTime > 650;

    // Trigger only if direction changes or if 650ms elapsed on the same direction drag
    if (isDirectionChange || isCooldownExpired) {
      if (this.whooshSound) {
        this.whooshSound.stop();
        this.whooshSound.play();
      }
      this.lastWhooshTime = now;
      this.lastWhooshDirection = direction;
    }
  }

  setMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (this.music) {
      this.music.mute(muted);
    }
    // Mute all other instances globally
    if (typeof (window as any).Howler !== 'undefined') {
      (window as any).Howler.mute(muted);
    }
  }

  isMuted() {
    return this.isMusicMuted;
  }
}

export const audioManager = new AudioManager();
