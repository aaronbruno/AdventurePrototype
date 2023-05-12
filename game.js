class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class LogoScene extends Phaser.Scene {
    constructor(){
        super("logoscene");
    }

    preload() {
        this.load.image('logo', 'assets/RubberDuckyTitle.png');
        this.load.image('ducky', 'assets/PixelDucky.png');
        
        this.load.audio('squeaky', 'assets/rubberduck_edited.mp3');
        console.log('Images and audio loaded, LogoScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('0xB19CD8');
        
        // Add logo image, and scale the logo
        let logo = this.add.image(game.config.width / 2, game.config.height / 2, 'logo').setScale(0);
        logo.alpha = 1;
        // Create the tween
        this.tweens.add({
            targets: logo,
            scaleX: 0.15,
            scaleY: 0.15,
            // alpha: 1,
            duration: 1500,
            ease: 'Power5',
            // delay: 1000,
        });

        // Right ducky
        let ducky1 = this.add.image(game.config.width / 2 + 650, game.config.height / 2, 'ducky').setScale(0.6, 0.6);
        ducky1.alpha = 0;
        this.tweens.add({
            targets: ducky1,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            delay: 2000,
        });

        // Left ducky
        let ducky2 = this.add.image(game.config.width / 2 - 650, game.config.height / 2, 'ducky').setScale(-0.6, 0.6);
        ducky2.alpha = 0;
        this.tweens.add({
            targets: ducky2,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            delay: 2000,
        });

        // Top rectangle
        let rectTop = this.add.rectangle(game.config.width + 800, game.config.height / 2 - 300, 1600, 10, 0x000000);
        let rTopTween = this.tweens.add({
            targets: rectTop,
            x: game.config.width / 2,
            duration: 1000,
            delay: 700,
        });
        rTopTween.play();

        // Right rectangle
        let rectRight = this.add.rectangle(game.config.width / 2 + 2650, game.config.height / 2 + 25, 10, 660, 0x000000);
        let rRightTween = this.tweens.add({
            targets: rectRight,
            x: game.config.width / 2 + 800,
            duration: 1000,
            delay: 700,
        });
        rTopTween.play();
    
        // Bottom rectangle
        let rectBot = this.add.rectangle(0 - game.config.width - 200, game.config.height / 2 + 350, 1600, 10, 0x000000);
        let rBotTween = this.tweens.add({
            targets: rectBot,
            x: game.config.width / 2,
            duration: 1000,
            delay: 700,
        });
        rBotTween.play();

        // Left rectangle
        let rectLeft = this.add.rectangle(game.config.width / 2 - 2650, game.config.height / 2 + 25, 10, 660, 0x000000);
        let rLeftTween = this.tweens.add({
            targets: rectLeft,
            x: game.config.width / 2 - 800,
            duration: 1000,
            delay: 700,
        });
        rTopTween.play();

        // Rubberducky squeak sound effect
        let squeak = this.sound.add('squeaky');
        squeak.play({ delay: 1.7 });

        // Camera fade out after a delay of 2000 ms, fade-out lasting 1000 ms
        this.time.delayedCall(3500, function () {
            this.cameras.main.fadeOut(2500);
        }, [], this);
        
        // Transition to title scene
        this.time.delayedCall(5000, () => {
            this.scene.start('intro');
        });
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [LogoScene, Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

