import React, { PureComponent } from 'react';
import Lessons from './components/lessons';
import Practice from './components/practice';
import Button from './components/button';
import Icon from './components/icon';
import japanesepodLessons from './constants/japanesepod';
import time from './constants/time';
import './app.css';

const JAPANESE_POD_LESSONS_PAGE = 'JAPANESE_POD_LESSONS_PAGE';
const TIME_LESSONS_PAGE = 'TIME_LESSONS_PAGE';
const pages = [
    { type: JAPANESE_POD_LESSONS_PAGE, text: 'JapanesePod101' },
    { type: TIME_LESSONS_PAGE, text: 'Time' }
];

export default class App extends PureComponent {
    state = {
        lessonsType: JAPANESE_POD_LESSONS_PAGE,
        lessonIndex: null,
        isPracticePopupShown: false
    };

    render() {
        const lessons = this.getLessons();

        return (
            <div className='app'>
                <div className='nav'>
                    {pages.map(page => (
                        <Button
                            key={page.type}
                            active={this.state.lessonsType === page.type}
                            onClick={() => this.handleChangeLessonsType(page.type)}>
                            {page.text}
                        </Button>
                    ))}
                    <Button onClick={this.handleShowPracticePopup}>
                        <Icon type='practice' />
                    </Button>
                </div>
                <Lessons
                    lessons={lessons}
                    onClickPractice={this.handleClickPractice} />
                {this.renderPracticePopup(lessons)}
            </div>
        );
    }

    renderPracticePopup(lessons) {
        const { lessonIndex, isPracticePopupShown } = this.state;

        if (!isPracticePopupShown) {
            return null;
        }

        if (lessonIndex !== null) {
            lessons = [lessons[lessonIndex]];
        }

        return (
            <Practice
                words={this.getWords(lessons)}
                onClose={this.handleClosePracticePopup} />
        );
    }

    handleShowPracticePopup = () => {
        this.setState({
            isPracticePopupShown: true
        });
    };

    handleClosePracticePopup = () => {
        this.setState({
            isPracticePopupShown: false,
            lessonIndex: null
        })
    };

    handleChangeLessonsType = lessonsType => {
        this.setState({ lessonsType });
    };

    handleClickPractice = index => {
        this.setState({
            isPracticePopupShown: true,
            lessonIndex: index
        });
    };

    getLessons() {
        switch (this.state.lessonsType) {
            case JAPANESE_POD_LESSONS_PAGE: {
                return japanesepodLessons;
            }

            case TIME_LESSONS_PAGE: {
                return time;
            }

            default: {
                return [];
            }
        }
    }

    getWords(lessons) {
        return lessons.reduce((result, { words }) => {
            return result.concat(words);
        }, []);
    }
}
