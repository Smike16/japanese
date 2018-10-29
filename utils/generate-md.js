require('babel-register')({
    presets: [ 'env' ]
});

const fs = require('fs');

class MD {
    constructor() {
        this.themes = require('../src/constants/themes').default;

        fs.writeFileSync('WORDS.md', this.renderThemes(), 'utf-8');
    }

    renderThemes() {
        return this.themes
            .map(this.renderTheme, this)
            .join('\n');
    }

    renderTheme(theme) {
        return [
            `#### ${theme.title}`,
            `| Japanese | Translation |`,
            '| ------ | ------ |',
            ...this.renderWords(theme.words)
        ].join('\n');
    }

    renderWords(words) {
        return words.map(this.renderWord, this);
    }

    renderWord(word) {
        return `| \`${word.japanese}\` | ${word.translation} |`;
    }
}

new MD();
