import {KEYS} from "../components/config.jsx";

import React, {useState, useEffect} from 'react';

import Page0 from './page_0.jsx';
import Page1 from './page_1.jsx';
import Page2 from './page_2.jsx';
import Page3 from './page_3.jsx';


export default function StoryManager({storyProgress, OnClueDetected}) {

    const [progress, setProgress] = useState(null);

    let open = false;
    useEffect(() => {
        setProgress(progress);
        open = true;
    }, [storyProgress])

    let page;
    switch (storyProgress) {
        case KEYS.story_000_start :
            page = (<Page0 OnClueDetected={OnClueDetected}/>);
            break;
        case KEYS.story_001_check_messages :
            page = (<Page1 OnClueDetected={OnClueDetected} />);
            break;
        case KEYS.story_002_check_news :
            page = (<Page2 OnClueDetected={OnClueDetected}/>);
            break;
        case KEYS.story_003_room :
            page = (<Page3 OnClueDetected={OnClueDetected}/>);
            break;
        default:
            throw new Error(`Unknown story ${storyProgress}`);
    }

    return (<div className={'p-5 d-flex h-100 align-items-center'}>
        {page}
    </div>)
};