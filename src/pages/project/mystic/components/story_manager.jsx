import React, {useState, useEffect} from 'react';
import {DATA} from "./config.jsx";

export default function StoryManager({storyData, storyProgress, OnClueDetected}) {

    const [content, setContent] = useState(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const story = storyData && storyData[storyProgress] ? storyData[storyProgress] : false;

        let page = null;
        let clue = null;
        if (story) {
            page = (<div dangerouslySetInnerHTML={{__html: story.text.split('\n\n\n').shift()}}/>);

            if (story && story.clue) {
                clue = (<p className={'p-1 game-content-clue animate__animated animate__headShake animate__delay-1s'}
                           onClick={() => OnClueDetected(story.clue.id)}>
                    {story.clue.title}
                </p>)
            }
            setCount(count + 1);
        }

        setContent(<div>
            {page}
            {clue}
        </div>);

    }, [storyData, storyProgress])

    return (<div className={'p-5'}>
        <div key={count} className={"animate__animated animate__fadeIn"}>
            {content}
        </div>
    </div>);
};