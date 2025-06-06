import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../../../styles/evidence_board.css';
import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Offcanvas, Button} from 'react-bootstrap';
import EvidenceBoard from './components/evidence_board.jsx';
import {KEYS, DATA} from "./components/config.jsx";
import StoryManager from './components/story_manager.jsx';

export default function Game() {
    const [showClueDetails, setShowClueDetails] = useState(null);
    const [description, setDescription] = useState("");
    const [connections, setConnections] = useState([]);
    const [clues, setClues] = useState([]);
    const [story_progress, setStoryProgress] = useState(KEYS.story_000_start);
    const [story_data, setStoryData] = useState(null);


    useEffect(() => {
        fetch('/story.json')
            .then(response => response.json())
            .then(data => {
                if (data.name !== "Mystic") {
                    throw new Error(`Invalid story.json`);
                }
                let story = {};
                for (const passage of data.passages) {
                    story[passage.name] = {
                        text: passage.text,
                        default_actions: passage.links
                            ? passage.links.map(link => {
                                return {
                                    title: link.link.split('|')[0],
                                    dst_story_id: link.link.split('|')[1]
                                };
                            })
                            : [],
                        possible_actions: []
                    }
                    if (passage.props && passage.props.clue_id) {
                        story[passage.name].clue = {
                            id: passage.props.clue_id,
                            title: passage.props.clue_title,
                        }
                    }
                }
                setStoryData(story);
            });
    }, [])

    const onClueHoverStart = id => {
        const clue = DATA.clues[id];
        if (clue) {
            setDescription(clue.description);
            setShowClueDetails(true);
        }
    };
    const onClueHoverEnd = () => {
        setShowClueDetails(false);
    };

    const OnClueDetected = clue_id => {
        if (!DATA.clues[clue_id]) throw new Error(`unsupported clue ${clue_id}`);
        if (!clues.includes(clue_id)) setClues([clue_id, ...clues]);
    };
    const OnAction = (story_id => {
        setStoryProgress(story_id);
    });
    const selectAction = (action) => {
        setStoryProgress(action.transition_story_id);
        // todo: line disable remove
    }

    const available_actions = connections.map(id => {
        const action = DATA.actions[id];
        if (!action) return;

        return (<span key={id}>
            <Button className={'m-1'} variant="outline-light"
                    disabled={story_progress !== action.related_story_id}
                    onClick={() => selectAction(action)}>
                {action.title}
            </Button>
        </span>);
    });

    for(const clue of clues) {
        const action = DATA.actions[clue];
        if(action) {
            available_actions.push((<span key={clue}>
            <Button className={'m-1'} variant="outline-light"
                    disabled={story_progress !== action.related_story_id}
                    onClick={() => selectAction(action)}>
                {action.title}
            </Button>
        </span>))
        }
    }


    let default_actions = [];
    if (story_data && story_data[story_progress]) {
        default_actions = story_data[story_progress].default_actions.map(({title, dst_story_id}) => {
            if (!story_data[dst_story_id]) throw new Error(`unsupported story ${dst_story_id}`);
            return <p key={dst_story_id} className="m-1 text-center">
                <Button variant="outline-light w-50" onClick={() => OnAction(dst_story_id)}>{title}</Button>
            </p>;
        });
    }

    const detail = (<div className={'p-5 game-clue-detail  ' + (showClueDetails ? '' : 'game-clue-detail-reverse')}>
        <p>{description}</p>
    </div>);

    const evidence_board = clues.length === 0
        ? null
        : (<div className={"animate__animated animate__fadeIn"}>
            <EvidenceBoard client:load
                           onClueHoverStart={onClueHoverStart}
                           onClueHoverEnd={onClueHoverEnd}
                           onConnectionChange={setConnections}
                           availableClues={clues}
            />
        </div>)

    return (
        <Container className={"p-0 m-0 bg-dark"} fluid>
            <Row className="game-layout-main-container">
                <Col md={6} className={"game-evidence-board-container"}>
                    {evidence_board}
                </Col>
                <Col md={6} className={"game-content-container overflow-auto"}>
                    <StoryManager storyData={story_data}
                                  storyProgress={story_progress}
                                  OnClueDetected={OnClueDetected}/>
                </Col>
            </Row>

            <Row className="game-layout-control-container animate__animated animate__fadeIn animate__delay-2s">
                <Col md={6} className={"overflow-auto m-0 p-0 text-center"}>
                    {available_actions}
                </Col>
                <Col md={6} className={"game-control-default-container"}>
                    <div className={'w-100 p-2'}>
                        {default_actions}
                    </div>
                </Col>
            </Row>
            {detail}
        </Container>
    );
};
