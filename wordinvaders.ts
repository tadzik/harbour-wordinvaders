/// <reference path="qml.d.ts" />

class WordInvaders {
    acceleration: number = 0.1
    currentWord: Word = null
    initialVelocity: number = 8
    running: boolean = true
    screen: Screen
    ticks_since_last_word: number = 0
    velocity: number
    wordComponent: any = Qt.createComponent("Word.qml")
    worddb: string[]
    words: any[] = []

    constructor(s: Screen, wordlist: string[]) {
        this.screen = s
        this.velocity = this.initialVelocity
        this.worddb = wordlist
    }

    handle_keypress(key: string) : void {
        if (!this.running) {
            return
        }
        if (!this.currentWord) {
            for (var word of this.words) {
                if (word.word.substring(0, 1) == key) {
                    this.currentWord = word
                }
            }
        }
        if (!this.currentWord) {
            return
        }
        var cword = this.currentWord
        var result = cword.handle_keypress(key)
        if (result == "wrong") {
            this.screen.score--
        }
        if (result == "completed") {
            this.screen.score += cword.word.length
            var words = []
            for (var word of this.words) {
                if (word != cword) {
                    words.push(word)
                }
            }
            this.words = words
            this.currentWord = null
            cword.destroy()
            this.velocity += this.acceleration
        }
    }

    tick() : void {
        if (!this.running) {
            return
        }
        if (this.should_spawn_word()) {
            this.spawn_word()
            this.ticks_since_last_word = 0
        } else {
            this.ticks_since_last_word++
        }
        for (var word of this.words) {
            word.y += word.velocity
            if (word.y > this.screen.height) {
                this.screen.onGameOver()
                this.running = false
                for (var word of this.words) {
                    word.opacity = 0.1
                }
            }
        }
    }

    should_spawn_word() : boolean {
        return this.words.length == 0 
            || (this.ticks_since_last_word > 128 && this.words.length < 3)
    }

    spawn_word() : void {
        var word = this.pick_word()
        var word_obj = this.wordComponent.createObject(
            this.screen,
            {
                word:     word,
                velocity: this.velocity / word.length
            }
        )
        var range = this.screen.width - word_obj.width
        var x = Math.floor(Math.random() * range)
        word_obj.x = x
        this.words.push(word_obj)
    }

    pick_word() : string {
        var index = Math.floor(Math.random() * this.worddb.length)
        return this.worddb[index]
    }

    restart() : void {
        for (var word of this.words) {
            word.destroy()
        }
        this.words = []
        this.currentWord = null
        this.screen.score = 0
        this.velocity = this.initialVelocity
        this.running = true
    }
}
