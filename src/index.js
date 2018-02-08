import './vendor/vr';
import bigbuckbunnyMp4 from './assets/videos/bigbuckbunny.mp4';
import bigbuckbunnyWebm from './assets/videos/bigbuckbunny.webm';

window.onload = () => {
    VR.floor();

    const box = VR.box({
        color: 0x1111DD,
        x: 2,
        y: 1,
        z: 0,
    });

    const video = VR.video([
        bigbuckbunnyMp4,
        bigbuckbunnyWebm,
    ]).moveTo(-1, 2, 1)
        .setScale(3)
        .rotateY(Math.PI / 6)
        .play();

    const timer = video.box({
        color: 'darkred',
    }).setScale(0.05).hide();

    const touch = video.text({
        text: 'Touch to play',
        font: '40px sans-serif',
        textBaseline: 'bottom',
    }).setScale(1 / 3).moveTo(0, 0, 0.05);

    video
        .on('loadedmetadata', (evt) => {
            timer.moveTo(-0.5, -0.5 * video.height / video.width, 0.05);
            timer.show();
        })
        .on('progress', (evt) => {
            touch.hide();
        })
        .on('error', (evt) => {
            console.log('video error', evt);
        });

    VR.animate(() => {
        const x = video.currentTime / video.duration - 0.5;
        timer.moveTo(x);
    });

    VR.on('shake', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    document.body.appendChild(video.element);
};
