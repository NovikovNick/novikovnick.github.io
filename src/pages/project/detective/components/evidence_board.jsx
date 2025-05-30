import {Circle, Group, Layer, Line, Rect, Stage, Text} from 'react-konva';
import {Portal} from 'react-konva-utils';
import React, {useEffect, useState} from 'react';
import {DATA, LAYOUT, STYLE, toConnId} from "./config.jsx";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export default function EvidenceBoard({onClueHoverStart, onClueHoverEnd, onConnectionChange, availableClues}) {
    const [clues_data, setCluesData] = useState(null);
    const [connection_data, setConnectionData] = useState({});

    const [hover_clue_id, hoverClueId] = useState("");
    const [selected_clue_id, selectClueId] = useState("");

    const [hover_connection_id, setHoverConnectionId] = useState("");
    const [new_connection_start, setNewConnectionStart] = useState({x: 0, y: 0});
    const [new_connection_end, setNewConnectionEnd] = useState({x: 0, y: 0});

    const [on_drag, setOnDrag] = useState(false);
    const [on_drag_clue, setOnDragClue] = useState(false);

    const createConnection = (src_id, dst_id) => {
        if (!connection_data[src_id]) connection_data[src_id] = {
            src: {
                x: clues_data[src_id].x,
                y: clues_data[src_id].y
            }, peers: []
        };
        if (!connection_data[src_id].peers.includes(dst_id)) connection_data[src_id].peers.push(dst_id);

        if (!connection_data[dst_id]) connection_data[dst_id] = {
            src: {
                x: clues_data[dst_id].x,
                y: clues_data[dst_id].y
            }, peers: []
        };
        if (!connection_data[dst_id].peers.includes(src_id)) connection_data[dst_id].peers.push(src_id);

        updateConnections(connection_data);
    }

    useEffect(() => {
        let clues = {};
        for (const clue_id of availableClues) {
            if (clues_data && clues_data[clue_id]) {
                clues[clue_id] = clues_data[clue_id];
            } else {
                clues[clue_id] = {...LAYOUT.clue_default_pos, ...DATA.clues[clue_id]};
            }
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

    const handleClueDragMove = (e, id) => {
        e.target.x(clamp(e.target.x(), 0, LAYOUT.width - STYLE.clue.base.width - 20));
        e.target.y(clamp(e.target.y(), 0, LAYOUT.height - STYLE.clue.base.height - 20));

        let clue = clues_data[id];
        if (clue) {
            clue.x = e.target.x();
            clue.y = e.target.y();
            setCluesData(clues_data);

            if (connection_data[id]) {
                connection_data[id].src = {x: clue.x, y: clue.y};
                updateConnections(connection_data);
            }
        }
    };

    const updateConnections = (connections_data) => {
        setConnectionData(connections_data);
        const connections = [];
        Object.entries(connections_data).forEach(([src_id, data], _) => {
            for (const dst_id of data.peers) {
                const conn_id = toConnId(src_id, dst_id);
                if (!connections.includes(conn_id)) connections.push(conn_id);
            }
        })
        onConnectionChange(connections);
    };

    const clues = Object.entries(clues_data || {}).map(([id, clue], _) => (
        <Portal key={id} selector=".top-layer" enabled={on_drag_clue && !on_drag && id === selected_clue_id}>
            <Group
                x={clue.x}
                y={clue.y}
                draggable
                onMouseDown={() => {
                    setOnDragClue(true);
                    selectClueId(id)
                }}
                onMouseUp={() => {
                    setOnDrag(false);
                    setOnDragClue(false);

                    if (selected_clue_id !== id) createConnection(id, selected_clue_id);
                }}
                onMouseEnter={(e) => {
                    document.body.style.cursor = 'pointer';
                    hoverClueId(id);
                    onClueHoverStart(id);
                }}
                onMouseLeave={(e) => {
                    document.body.style.cursor = 'default';
                    hoverClueId("");
                    onClueHoverEnd();
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
                       onMouseEnter={() => document.body.style.cursor = 'grab'}
                       onMouseLeave={() => document.body.style.cursor = 'default'}
                >

                    <Circle x={5} y={5} width={20} height={20} {...STYLE.pin.base} />
                    <Circle width={15} height={15} {...STYLE.pin.base} />
                </Group>
            </Group>
        </Portal>
    ));

    const connections = Object.entries(connection_data).map(([clue_src_id, data], _) => {
        const start = data.src;
        return data.peers.map((clue_dst_id) => {
            const conn_id = toConnId(clue_src_id, clue_dst_id);
            return (<Line
                key={conn_id}
                points={[start.x, start.y, clues_data[clue_dst_id].x, clues_data[clue_dst_id].y]}

                {...STYLE.connection.base}
                {...(hover_connection_id === conn_id ? STYLE.connection.hover : null)}

                onClick={(e) => {
                    connection_data[clue_src_id].peers = connection_data[clue_src_id].peers.filter(id => id !== clue_dst_id);
                    connection_data[clue_dst_id].peers = connection_data[clue_dst_id].peers.filter(id => id !== clue_src_id);
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
        <Stage width={LAYOUT.width} height={LAYOUT.height} className={'game-evidence-board-container'}>
            <Layer onMouseUp={() => {
                setOnDrag(false);
                setOnDragClue(false);
            }}>
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
