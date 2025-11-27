/**
 * Audio System
 *
 * Manages music tracks and sound effects for the game.
 * Handles playback, volume control, and muting.
 */
import type {AudioTrackType} from "../types";

/**
 * Audio management system
 */
export class AudioSystem {
    private tracks: Map<AudioTrackType, HTMLAudioElement> = new Map();
    private currentTrack: AudioTrackType | null = null;
    private muted: boolean = false;
    private volume: number = 0.5; // Default 50% volume

    /**
     * Register an audio track
     */
    registerTrack(type: AudioTrackType, audio: HTMLAudioElement): void {
        audio.volume = this.volume;
        this.tracks.set(type, audio);
    }

    /**
     * Play a specific track
     */
    play(type: AudioTrackType): void {
        const track = this.tracks.get(type);
        if (!track) {
            console.warn(`Audio track "${type}" not found`);
            return;
        }

        // Stop current track if different
        if (this.currentTrack && this.currentTrack !== type) {
            this.stopCurrent();
        }

        this.currentTrack = type;

        if (!this.muted) {
            track.currentTime = 0;
            track.play().catch((error) => {
                console.log(`Audio play failed for "${type}":`, error);
            });
        }
    }

    /**
     * Stop the currently playing track
     */
    stopCurrent(): void {
        if (!this.currentTrack) return;

        const track = this.tracks.get(this.currentTrack);
        if (track) {
            track.pause();
            track.currentTime = 0;
        }

        this.currentTrack = null;
    }

    /**
     * Stop all tracks
     */
    stopAll(): void {
        for (const track of this.tracks.values()) {
            track.pause();
            track.currentTime = 0;
        }
        this.currentTrack = null;
    }

    /**
     * Pause current track
     */
    pause(): void {
        if (!this.currentTrack) return;

        const track = this.tracks.get(this.currentTrack);
        if (track) {
            track.pause();
        }
    }

    /**
     * Resume current track
     */
    resume(): void {
        if (!this.currentTrack || this.muted) return;

        const track = this.tracks.get(this.currentTrack);
        if (track) {
            track.play().catch((error) => {
                console.log(`Audio resume failed:`, error);
            });
        }
    }

    /**
     * Set muted state
     */
    setMuted(muted: boolean): void {
        this.muted = muted;

        if (muted) {
            // Mute all tracks
            for (const track of this.tracks.values()) {
                track.pause();
            }
        } else {
            // Unmute and resume current track
            this.resume();
        }
    }

    /**
     * Get muted state
     */
    isMuted(): boolean {
        return this.muted;
    }

    /**
     * Set volume for all tracks (0-1)
     */
    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(1, volume));
        for (const track of this.tracks.values()) {
            track.volume = this.volume;
        }
    }

    /**
     * Get current volume
     */
    getVolume(): number {
        return this.volume;
    }

    /**
     * Get current track type
     */
    getCurrentTrack(): AudioTrackType | null {
        return this.currentTrack;
    }

    /**
     * Check if a track is currently playing
     */
    isPlaying(type: AudioTrackType): boolean {
        const track = this.tracks.get(type);
        return track ? !track.paused : false;
    }

    /**
     * Set up track transitions
     * For example, when Tedox ends, automatically start Neon Owl
     */
    setupTransition(
        from: AudioTrackType,
        to: AudioTrackType,
    ): void {
        const fromTrack = this.tracks.get(from);
        if (!fromTrack) return;

        // Remove any existing ended listeners to avoid duplicates
        fromTrack.removeEventListener("ended", this.handleTrackEnded);

        // Add new listener
        fromTrack.addEventListener("ended", () => {
            if (!this.muted) {
                this.play(to);
            }
        });
    }

    /**
     * Handle track ended event
     */
    private handleTrackEnded = (): void => {
        // Placeholder for track end logic
    };

    /**
     * Clean up resources
     */
    cleanup(): void {
        this.stopAll();
        for (const track of this.tracks.values()) {
            track.removeEventListener("ended", this.handleTrackEnded);
        }
        this.tracks.clear();
    }
}
