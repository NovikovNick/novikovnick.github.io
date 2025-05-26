import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/evidence_board.css';
import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Offcanvas, Button} from 'react-bootstrap';
import EvidenceBoard from './components/evidence_board.jsx';
import {INITIAL_STATE} from "./components/config.jsx";
import Page0 from './story/page_0.jsx';
import Page1 from './story/page_1.jsx';
import Page2 from './story/page_2.jsx';


const App = () => {
    const [show, setShow] = useState(true);
    const [description, setDescription] = useState("");
    const [connections, setConnections] = useState([]);
    const [conclusions, setConclusions] = useState([]);
    const [clues, setClues] = useState(['clue1', 'clue2', 'clue3']);
    const [story_map, setStoryMap] = useState(null);
    const [story_progress, setStoryProgress] = useState("story0");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onClueSelect = id => {
        const clue = INITIAL_STATE.clues[id];
        if(clue) setDescription(clue.description);
    }
    const OnConclusionChoose = (id) => {
        const conclusion = INITIAL_STATE.conclusions[id];
        if(conclusion) {
            let new_clues = [...clues];
            for(const clue_id of conclusion.clues) {
                console.log(id + " " + clue_id);
                new_clues = new_clues.filter(clue => clue !== clue_id)
            }
            new_clues.push(...conclusion.open_clue)
            setClues(new_clues);
            setConclusions([...connections, conclusion]);
        }
    };
    const onQuestSolve = ((quest_id, conclusion_id) => {
        console.log(`${quest_id} solved with ${conclusion_id}`);
        if(INITIAL_STATE.quests[quest_id].solutions.includes(conclusion_id)) {
            if(conclusion_id === 'clue4') setStoryProgress("story1");
            if(conclusion_id === 'clue5') setStoryProgress("story2");
            handleShow();
        }
    });

    useEffect(() => {
        setStoryMap({
            "story0" : (<Page0 OnContinue={handleClose}/>),
            "story1" : (<Page1 OnContinue={handleClose}/>),
            "story2" : (<Page2 OnContinue={handleClose}/>),
        });
    }, []);

    const available_conclusions = connections.map(id => {
        const conclusion = INITIAL_STATE.conclusions[id];
        if(!conclusion) return;

        return (<p key={id}>
            <Button variant="outline-light" onClick={() => OnConclusionChoose(id)}>
                {conclusion.title}
            </Button>
        </p>);
    });

    return (
        <Container className={"p-5 mb-4 bg-dark rounded-3"} fluid>
            <Row>
                <Col md={2}>
                    <h1 className={'noir-title'}>Зацепки</h1>
                </Col>
                <Col md={5}>
                </Col>
                <Col md={5}>
                    <h1 className={'noir-title'}>Данные по зацепке</h1>
                </Col>
            </Row>

            <Row>
                <Col md={7} className="overflow-hidden">
                    <EvidenceBoard client:load
                                   onClueSelect={onClueSelect}
                                   onQuestSolve={onQuestSolve}
                                   onConnectionChange={setConnections}
                                   availableClues={clues}
                                   availableConclusions={conclusions}
                    />
                </Col>
                <Col md={5}>
                    <Row>
                        <p>{description} </p>
                    </Row>
                    <hr/>
                    <Row>
                        <h1 className={'noir-title p-3'}>Доступные выводы</h1>
                        {available_conclusions}
                    </Row>
                </Col>
            </Row>
            <Offcanvas show={show} onHide={handleClose} bsPrefix={'w-100 offcanvas'}>
                <Offcanvas.Body>
                    {story_map && story_map[story_progress] ? story_map[story_progress] : null}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
}
export default App;