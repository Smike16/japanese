import React, { PureComponent } from 'react';
import Lessons from './components/lessons';
import Button from './components/button';
import sgurtovaLessons from './constants/sgurtova';
import japanesepodLessons from './constants/japanesepod';
import './app.css';

const SGURTOVA_LESSONS_PAGE = 'SGURTOVA_LESSONS_PAGE';
const JAPANESE_POD_LESSONS_PAGE = 'JAPANESE_POD_LESSONS_PAGE';
const pages = [
    { type: JAPANESE_POD_LESSONS_PAGE, text: 'JapanesePod101' },
    { type: SGURTOVA_LESSONS_PAGE, text: 'Sgurtova' }
];

export default class App extends PureComponent {
    state = {
        lessonsType: JAPANESE_POD_LESSONS_PAGE
    };

    render() {
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
                </div>
                <Lessons lessons={this.getLessons()} />
            </div>
        );
    }

    handleChangeLessonsType = lessonsType => {
        this.setState({ lessonsType });
    };

    getLessons() {
        switch (this.state.lessonsType) {
            case JAPANESE_POD_LESSONS_PAGE: {
                return japanesepodLessons;
            }

            case SGURTOVA_LESSONS_PAGE: {
                return sgurtovaLessons;
            }

            default: {
                return [];
            }
        }
    }
}
