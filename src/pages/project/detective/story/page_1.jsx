import {KEYS} from "../components/config.jsx";

export default function Page({OnClueDetected}) {
    return (
        <div className={'animate__animated animate__fadeIn'}>
            <p className="m-0 p-0">
                У вас одно непрочитанное сообщение от незнакомого профиля. На аватарке лысый мужик лет 45 демонстрирует рыбу.
            </p>
            <p className={'p-5 game-content-clue animate__animated animate__headShake animate__delay-1s'} onClick={() => OnClueDetected(KEYS.clue_00_visit_1st_apartment)}>
                Здравствуйте, я по объявлению. Зайдите ко мне завтра в 1 квартиру.
            </p>
            <p className={'p-5 game-content-clue animate__animated animate__headShake animate__delay-1s'} onClick={() => OnClueDetected(KEYS.clue_01)}>
                adsf
            </p>
        </div>
    );
};
