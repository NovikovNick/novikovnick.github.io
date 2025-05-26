export const INITIAL_STATE = {
    clues: {
        clue1: {
            x: 0,
            y: 60,
            title: "Клиент\nкурит\nсигареты",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan interdum risus, at vestibulum est bibendum et. Proin sed cursus augue. Aliquam tincidunt fringilla orci, id consectetur massa hendrerit nec. In elementum eget nunc in egestas. Integer sodales vestibulum fermentum. Pellentesque ac enim cursus, egestas elit ut, mattis quam. Nullam quis nisi vitae elit porttitor placerat. Ut dolor purus, pellentesque at magna vel, auctor convallis metus. Proin viverra sodales risus, ut aliquet enim hendrerit sit amet. Phasellus id purus diam."
        },
        clue2: {
            x: 110,
            y: 60,
            title: "В\nкармане\nесть\nдешевые\nсигареты",
            description: "In elementum eget nunc in egestas. Integer sodales vestibulum fermentum. Pellentesque ac enim cursus, egestas elit ut, mattis quam."
        },
        clue3: {
            x: 0,
            y: 180,
            title: "На\nстоле\nесть\nдешевый\nвиски",
            description: "In elementum eget nunc in egestas. Integer sodales vestibulum fermentum. Pellentesque ac enim cursus, egestas elit ut, mattis quam. Nullam quis nisi vitae elit porttitor placerat. Ut dolor purus, pellentesque at magna vel, auctor convallis metus. Proin viverra sodales risus, ut aliquet enim hendrerit sit amet. Phasellus id purus diam."
        },
        clue4: {
            x: 0,
            y: 60,
            title: "Предложить\nвиски",
            description: "Pellentesque ac enim cursus, egestas elit ut, mattis quam. Nullam quis nisi vitae elit porttitor placerat. Ut dolor purus, pellentesque at magna vel, auctor convallis metus. Proin viverra sodales risus, ut aliquet enim hendrerit sit amet. Phasellus id purus diam.",
            isConclusion: true,
        },
        clue5: {
            x: 0,
            y: 60,
            title: "Предложить\nсигареты",
            description: "Ut dolor purus, pellentesque at magna vel, auctor convallis metus. Proin viverra sodales risus, ut aliquet enim hendrerit sit amet. Phasellus id purus diam.",
            isConclusion: true,
        },
    },
    quests: {
        quest1: {
            x: 300,
            y: 30,
            title: "Произвести\nхорошее\nвпечатление\nна клиента",
            solutions: ['clue4', 'clue5']
        }
    },
    connections: {},
    conclusions: {
        "clue1_clue2_connection": {
            title: "Клиенту понравятся сигареты",
            clues: ['clue1', 'clue2'],
            open_clue: ['clue5'],
            description: "Клиенту\nпонравятся\nсигареты",
        },
        "clue1_clue3_connection": {
            title: "Клиенту понравится виски",
            clues: ['clue1', 'clue3'],
            open_clue: ['clue4'],
            description: "Клиенту\nпонравятся\nвиски",
        },
    },
};

export const STYLE = {
    quest: {
        base: {
            width: 100,
            height: 110,
            fill: "red",
            stroke: "black",
            strokeWidth: 2,
            cornerRadius: 2,
        }
    },
    clue: {
        base: {
            width: 100,
            height: 110,
            fill: "yellow",
            stroke: 'black',
            strokeWidth: 1,
            cornerRadius: 2,

            shadowColor: "black",
            shadowBlur: 10,
            shadowOffset: {x: 5, y: 5,},
            shadowOpacity: 0.6,
        },
        hover: {
            strokeWidth: 3,
            rotation: 1
        },
        select: {
            fill: "#ff9b00",
            strokeWidth: 3,
        },
        drag: {
            scale: {x: 1.05, y: 1.05},
            shadowOffset: {x: 8, y: 8},
        },
    },
    pin: {
        base: {
            fill: "red",
            stroke: 'black',
            strokeWidth: 0.5,

            shadowColor: "black",
            shadowBlur: 10,
            shadowOffset: {x: 5, y: 5,},
            shadowOpacity: 0.6,
        }
    },
    connection: {
        base: {
            stroke: 'red',
            strokeWidth: 4,
            lineCap: "round",
            lineJoin: "round",

            shadowColor: "black",
            shadowBlur: 10,
            shadowOffset: {x: 5, y: 5,},
            shadowOpacity: 0.6,
        },
        hover: {strokeWidth: 6,},
    },
}

export const LAYOUT = {
    width: 800,
    height: 600,
    board_left_offset: 220,
    board_top_offset: 20,
}