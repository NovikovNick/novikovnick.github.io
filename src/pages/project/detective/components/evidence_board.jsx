import {Circle, Group, Image, Layer, Line, Rect, Text, Stage} from 'react-konva';
import {Portal} from 'react-konva-utils';
import React, {useState, useEffect} from 'react';
import {INITIAL_STATE, STYLE, LAYOUT} from "./config.jsx";
import useImage from 'use-image';

function toConnId(lhs_id, rhs_id) {
    if (lhs_id > rhs_id) return toConnId(rhs_id, lhs_id);
    return lhs_id + "_" + rhs_id + "_connection";
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function EvidenceBoard({onClueSelect, onQuestSolve, onConnectionChange, availableClues}) {

    const [boardImage] = useImage('/empty_evidence_board.jpg');

    const [quests_data, setQuestsData] = useState(INITIAL_STATE.quests);
    const [clues_data, setCluesData] = useState(null);
    const [connection_data, setConnectionData] = useState(INITIAL_STATE.connections);

    const [hover_clue_id, hoverClueId] = useState("");
    const [selected_clue_id, selectClueId] = useState("");

    const [hover_connection_id, setHoverConnectionId] = useState("");
    const [new_connection_start, setNewConnectionStart] = useState({x: 0, y: 0});
    const [new_connection_end, setNewConnectionEnd] = useState({x: 0, y: 0});

    const [on_drag, setOnDrag] = useState(false);
    const [on_drag_clue, setOnDragClue] = useState(false);

    useEffect(() => {
        let clues = {};
        for (const clue_id of availableClues) {
            clues[clue_id] = (clues_data && clues_data[clue_id]) ? clues_data[clue_id] : INITIAL_STATE.clues[clue_id];
        }
        if (clues_data) {
            const updated_connection_data = {...connection_data};
            Object.entries(clues_data).map(([id, clue]) => {
                if (!availableClues.includes(id)) {
                    delete updated_connection_data[id];
                    Object.keys(updated_connection_data).forEach(src_id => {
                        updated_connection_data[src_id] = updated_connection_data[src_id].filter(el => el !== id);
                    });
                }
            });
            updateConnections(updated_connection_data);
        }
        setCluesData(clues);
    }, [availableClues])

    const handleQuestDragMove = (e) => {
        e.target.x(clamp(e.target.x(), LAYOUT.board_left_offset, 1050));
        e.target.y(LAYOUT.board_top_offset + 10);
    };
    const handleClueDragMove = (e, id) => {
        e.target.x(clamp(e.target.x(), 0, 1050));
        e.target.y(clamp(e.target.y(), 60, 500));

        let clue = clues_data[id];
        if (clue) {
            clue.x = e.target.x();
            clue.y = e.target.y();
            setCluesData(clues_data);
        }
    };
    const updateConnections = (connections_data) => {
        setConnectionData(connections_data);
        const connections = [];
        Object.entries(connections_data).forEach(([src_id, destinations], _) => {
            for (const dst_id of destinations) {
                const conn_id = toConnId(src_id, dst_id);
                if (!connections.includes(conn_id)) connections.push(conn_id);
            }
        })
        onConnectionChange(connections);
    };

    const quests = Object.entries(quests_data).map(([id, quest], _) => (
        <Group x={quest.x}
               y={quest.y}
               key={id}
               draggable
               onMouseEnter={(e) => {
                   document.body.style.cursor = 'pointer';
               }}
               onMouseLeave={(e) => {
                   document.body.style.cursor = 'default';
               }}
               onMouseUp={(e) => {
                   const clue = clues_data[selected_clue_id];
                   if(clue && clue.isConclusion) {
                       onQuestSolve(id, selected_clue_id);
                   }
               }}
               onDragMove={handleQuestDragMove}>
            <Rect {...STYLE.quest.base}/>
            <Text
                text={quest.title}
                fontSize={15}
                fontFamily={'Handwritten'}
                rotation={-5}
                x={5}
                y={15}
            />
        </Group>
    ));

    const clues = Object.entries(clues_data || {}).map(([id, clue], _) => (
        <Portal key={id} selector=".top-layer" enabled={on_drag_clue && !on_drag && id === selected_clue_id}>
            <Group
                x={clue.x}
                y={clue.y}
                draggable
                onMouseDown={() => {
                    setOnDragClue(true);
                    selectClueId(id)
                    onClueSelect(id)
                }}
                onMouseUp={() => {
                    setOnDrag(false);
                    setOnDragClue(false);

                    if (selected_clue_id !== id) {
                        if (!connection_data[id]) connection_data[id] = []
                        if (!connection_data[id].includes(selected_clue_id)) connection_data[id].push(selected_clue_id);

                        if (!connection_data[selected_clue_id]) connection_data[selected_clue_id] = []
                        if (!connection_data[selected_clue_id].includes(id)) connection_data[selected_clue_id].push(id);

                        updateConnections(connection_data);
                    }
                }}
                onMouseEnter={(e) => {
                    document.body.style.cursor = 'pointer';
                    hoverClueId(id);
                }}
                onMouseLeave={(e) => {
                    document.body.style.cursor = 'default';
                    hoverClueId("");
                }}
                onDragMove={(e) => {
                    if (!on_drag) handleClueDragMove(e, id)
                }}>

                <Rect {...STYLE.clue.base}
                      {...(id === hover_clue_id ? STYLE.clue.hover : null)}
                      {...(id === selected_clue_id ? STYLE.clue.select : null)}
                      {...(id === selected_clue_id && on_drag_clue ? STYLE.clue.drag : null)}
                />

                <Text
                    text={clue.title}
                    fontSize={15}
                    fontFamily={'Handwritten'}
                    rotation={-5}
                    x={5}
                    y={15}
                />

                <Group visible={clue.x > LAYOUT.board_left_offset && !(on_drag_clue && id === selected_clue_id)}
                       draggable
                       dragBoundFunc={(pos) => {
                           const start = {
                               x: clue.x,
                               y: clue.y
                           };
                           setNewConnectionStart(start)
                           setNewConnectionEnd(pos)
                           return start;
                       }}
                       onMouseDown={() => {
                           selectClueId(id)
                           setOnDrag(true)
                           setNewConnectionStart({x: 0, y: 0});
                           setNewConnectionEnd({x: 0, y: 0})
                       }}
                       onMouseUp={() => setOnDrag(false)}
                       onMouseEnter={(e) => {
                           document.body.style.cursor = 'grab';
                       }}
                       onMouseLeave={(e) => {
                           document.body.style.cursor = 'default';
                       }}
                >

                    <Circle x={5} y={5} width={20} height={20} {...STYLE.pin.base} />
                    <Circle width={15} height={15} {...STYLE.pin.base} />
                </Group>
            </Group>
        </Portal>
    ));

    const connections = Object.entries(connection_data).map(([clue_src_id, clue_dst_ids], _) => {
        console.log(connection_data);
        return clue_dst_ids.map((clue_dst_id) => {
            const conn_id = toConnId(clue_src_id, clue_dst_id);
            return (<Line
                key={conn_id}
                points={[clues_data[clue_src_id].x, clues_data[clue_src_id].y, clues_data[clue_dst_id].x, clues_data[clue_dst_id].y]}

                {...STYLE.connection.base}
                {...(hover_connection_id === conn_id ? STYLE.connection.hover : null)}

                onClick={(e) => {
                    connection_data[clue_src_id] = connection_data[clue_src_id].filter(id => id !== clue_dst_id);
                    connection_data[clue_dst_id] = connection_data[clue_dst_id].filter(id => id !== clue_src_id);
                    updateConnections(connection_data);
                    setHoverConnectionId("");
                }}
                onMouseEnter={() => {
                    document.body.style.cursor = 'pointer';
                    setHoverConnectionId(conn_id);
                }}
                onMouseLeave={() => {
                    document.body.style.cursor = 'default';
                    setHoverConnectionId("");
                }}
            />)
        });
    });

    return (
        <Stage width={LAYOUT.width} height={LAYOUT.height}>
            <Layer onMouseUp={() => {
                setOnDrag(false);
                setOnDragClue(false);
            }}>
                <Image x={LAYOUT.board_left_offset} y={LAYOUT.board_top_offset} image={boardImage}
                       scale={{x: 0.65, y: 0.65}}/>
                {quests}
                {clues}
                {connections}
                <Line
                    visible={on_drag}
                    points={[new_connection_start.x, new_connection_start.y, new_connection_end.x, new_connection_end.y]}
                    stroke="red"
                    strokeWidth={4}
                    lineCap="round"
                    lineJoin="round"
                />
            </Layer>
            <Layer name="top-layer"/>
        </Stage>
    );
};

export default EvidenceBoard;