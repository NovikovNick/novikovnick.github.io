import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../../../styles/evidence_board.css';
import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Offcanvas, Button} from 'react-bootstrap';
import EvidenceBoard from './components/evidence_board.jsx';
import {KEYS, DATA} from "./components/config.jsx";
import StoryManager from './story/story_manager.jsx';

export default function Game() {
    const [showClueDetails, setShowClueDetails] = useState(null);
    const [description, setDescription] = useState("");
    const [connections, setConnections] = useState([]);
    const [clues, setClues] = useState([]);
    const [story_progress, setStoryProgress] = useState(KEYS.story_000_start);

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

    const default_actions = DATA.story[story_progress].default_actions.map(({title, dst_story_id}) => {
        if (!DATA.story[dst_story_id]) throw new Error(`unsupported story ${dst_story_id}`);
        return <p key={dst_story_id} className="m-1 text-center">
            <Button variant="outline-light w-50" onClick={() => OnAction(dst_story_id)}>{title}</Button>
        </p>;
    });

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
        <Container className={"p-0 m-0 bg-dark overflow-hidden"} fluid>
            <Row className="game-layout-main-container overflow-hidden">
                <Col md={6} className={"overflow-hidden m-0 p-0"}>
                    {evidence_board}
                </Col>
                <Col md={6} className={"game-content-container"}>
                    <StoryManager storyProgress={story_progress} OnClueDetected={OnClueDetected}/>
                </Col>
            </Row>

            <Row className="game-layout-control-container animate__animated animate__fadeIn animate__delay-2s">
                <Col md={6} className={"overflow-hidden m-0 p-0"}>
                    {available_actions}
                </Col>
                <Col md={6} className={"game-control-default-container"}>
                    <div className="d-flex h-100 align-items-center">
                        <div className={'w-100'}>
                            {default_actions}
                        </div>
                    </div>
                </Col>
            </Row>
            {detail}
        </Container>
    );
};
