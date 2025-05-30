export function toConnId(lhs_id, rhs_id) {
    if (lhs_id > rhs_id) return toConnId(rhs_id, lhs_id);
    return lhs_id + "_" + rhs_id + "_connection";
}

export const KEYS = {
    clue_00_visit_1st_apartment: "clue_00_visit_1st_apartment",
    clue_01: "clue_01",

    story_000_start: "story_000_start",
    story_001_check_messages: "story_001_check_messages",
    story_002_check_news: "story_002_check_news",
    story_003_room: "story_003_get_up",
}

export const DATA = {
    clues: {},
    story: {},
    actions: {},
};

/**         CLUE        **/

DATA.clues[KEYS.clue_00_visit_1st_apartment] = {
    title: "Меня зовут\nв квартиру\nномер 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan interdum risus, at vestibulum est bibendum et. Proin sed cursus augue. Aliquam tincidunt fringilla orci, id consectetur massa hendrerit nec. In elementum eget nunc in egestas. Integer sodales vestibulum fermentum. Pellentesque ac enim cursus, egestas elit ut, mattis quam. Nullam quis nisi vitae elit porttitor placerat. Ut dolor purus, pellentesque at magna vel, auctor convallis metus. Proin viverra sodales risus, ut aliquet enim hendrerit sit amet. Phasellus id purus diam."
}

DATA.clues[KEYS.clue_01] = {
    title: "Тестовая",
    description: "Proin sed cursus augue. Aliquam tincidunt fringilla orci, id consectetur massa hendrerit nec. In elementum eget nunc in egestas. Integer sodales vestibulum fermentum. Pellentesque ac enim cursus, egestas elit ut, mattis quam. Nullam quis nisi vitae elit porttitor placerat. Ut dolor purus, pellentesque at magna vel, auctor convallis metus. Proin viverra sodales risus, ut aliquet enim hendrerit sit amet. Phasellus id purus diam."
}

/**         STORY        **/

DATA.story[KEYS.story_000_start] = {
    default_actions: [
        {title: "Проверить сообщения", dst_story_id: KEYS.story_001_check_messages},
        {title: "Проверить новости", dst_story_id: KEYS.story_002_check_news},
        {title: "Встать с кровати", dst_story_id: KEYS.story_003_room},
    ],
    possible_actions: []
}
DATA.story[KEYS.story_001_check_messages] = {
    default_actions: [{title: "Назад", dst_story_id: KEYS.story_000_start}],
    possible_actions: []
}
DATA.story[KEYS.story_002_check_news] = {
    default_actions: [{title: "Назад", dst_story_id: KEYS.story_000_start}],
    possible_actions: []
}
DATA.story[KEYS.story_003_room] = {default_actions: [
        {title: "Проверить записи", dst_story_id: KEYS.story_000_start},
        {title: "Выглянуть в окно", dst_story_id: KEYS.story_001_check_messages},
        {title: "Пойти на кухню", dst_story_id: KEYS.story_002_check_news},
    ], possible_actions: []}

/**         CONCLUSIONS        **/

DATA.actions[toConnId(KEYS.clue_00_visit_1st_apartment, KEYS.clue_01)] = {
    id: toConnId(KEYS.clue_00_visit_1st_apartment, KEYS.clue_01),
    title: "Открыть дверь",
    related_story_id: KEYS.story_000_start,
    transition_story_id: KEYS.story_001_check_messages,
    description: "Клиенту\nпонравятся\nсигареты",
}

/**         STYLE        **/

export const STYLE = {
    clue: {
        base: {
            width: 100,
            height: 100,
            fill: "#d5b515",
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
            strokeWidth: 3,
        },
        drag: {
            scale: {x: 1.05, y: 1.05},
            shadowOffset: {x: 8, y: 8},
        },
    },
    pin: {
        base: {
            fill: '#b60000',
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
            stroke: '#b60000',
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
    width: 1024,
    height: 600,
    board_left_offset: 0,
    board_top_offset: 0,
    clue_default_pos: {x: 10, y: 10},
}