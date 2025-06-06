export function toConnId(lhs_id, rhs_id) {
    if (lhs_id > rhs_id) return toConnId(rhs_id, lhs_id);
    return lhs_id + "_" + rhs_id + "_connection";
}

export const KEYS = {
    clue_00_war: "clue_00_war",
    clue_01_unemployment: "clue_01_unemployment",
    clue_02_login: "clue_02_login",
    clue_03_pc_login: "clue_03_pc_login",
    clue_04_3rd_closed: "clue_04_3rd_closed",

    story_000_start: "s000_start",
    story_001_check_messages: "s001_check_messages",
    story_002_check_news: "s002_check_news",
    story_003_room: "s003_get_up",
    story_006_room: "s006_room",
    story_009_launch_pc: "s009_launch_pc",
    story_021_end: "s021_end",
    story_022_happyend: "s022_happyend",
    story_023_commandant_dialog1: "s023_commandant_dialog1",
    story_024_commandant_dialog2: "s024_commandant_dialog2",
    story_025_1st_floor: "s025_1st_floor",
    story_026_commandant_dialog3: "s026_commandant_dialog3",
}

export const DATA = {
    clues: {},
    actions: {},
};

/**         CLUE        **/

DATA.clues[KEYS.clue_00_war] = {
    title: "6066 день\nвойны\n",
    description: "War. War Never Changes."
}

DATA.clues[KEYS.clue_01_unemployment] = {
    title: "Тотальная\nбезработица\n",
    description: "Вы не смогли устроиться ни дворником, ни грузчиком. Такая экономическая ситуация сейчас. \n¯\\_(ツ)_/¯"
}

DATA.clues[KEYS.clue_02_login] = {
    title: "\n556-П46\n",
    description: "Этот листочек с кодом доступа от коменданта дома. Его необходимо ввести на компьютере."
}

DATA.clues[KEYS.clue_03_pc_login] = {
    title: "asychev\n@mail.com\nsychev2005\n",
    description: "Выглядит как логин и пароль."
}

DATA.clues[KEYS.clue_04_3rd_closed] = {
    title: "Дезинсекция\nна третьем\nэтаже",
    description: "Что за дезинсекция? Причем тут насекомые?"
}

/**         CONCLUSIONS        **/

DATA.actions[toConnId(KEYS.clue_00_war, KEYS.clue_01_unemployment)] = {
    id: toConnId(KEYS.clue_00_war, KEYS.clue_01_unemployment),
    title: "Выйти в окно",
    related_story_id: KEYS.story_000_start,
    transition_story_id: KEYS.story_022_happyend,
}

DATA.actions[KEYS.clue_03_pc_login] = {
    id: KEYS.clue_03_pc_login,
    title: "Включить компьютер",
    related_story_id: KEYS.story_006_room,
    transition_story_id: KEYS.story_009_launch_pc,
}

DATA.actions[KEYS.clue_02_login] = {
    id: KEYS.clue_02_login,
    title: "Ввести код доступа",
    related_story_id: KEYS.story_009_launch_pc,
    transition_story_id: KEYS.story_021_end,
}

DATA.actions[KEYS.clue_00_war] = {
    id: KEYS.clue_00_war,
    title: "Высказаться о войне",
    related_story_id: KEYS.story_023_commandant_dialog1,
    transition_story_id: KEYS.story_024_commandant_dialog2,
}

DATA.actions[KEYS.clue_04_3rd_closed] = {
    id: KEYS.clue_04_3rd_closed,
    title: "Рассказать про дезинсекцию",
    related_story_id: KEYS.story_025_1st_floor,
    transition_story_id: KEYS.story_026_commandant_dialog3,
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