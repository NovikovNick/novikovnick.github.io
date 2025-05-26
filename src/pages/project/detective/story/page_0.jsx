import {Container, Button} from 'react-bootstrap';

export default function App({OnContinue})  {
    return (
        <Container className="p-5">
            <h1 className={'noir-title p-5 text-center'}>True Noir Detective</h1>
            <div className="noir-content m-auto">
                <p>
                    Дверь распахнулась и на пороге стояла она. Хозяин кабинета невольно замер засмотревшись
                    на вошедшевдшую. Ее длинное вечернее платье которое она надела несмотря на ливень
                    придавало ей загадку.
                </p>
                <p>
                    - Вы частный детектив Винсент Данте? - томно спросила девушка, небрежно стряхивая пепел
                    своей сигаретки на ковер.
                </p>
                <p>
                    - Да, к вашим услугам, - ответил сыщик, попытавшись придать своему голосу более низкое
                    звучание.
                </p>
                <p>
                    - О, неужто моим мучениям наконец-то придет конец! - радостно воскликнула красотка. Да,
                    она была чертовски красива. Красива и рокова.
                </p>
                <p className={'text-center'}>
                    <Button className={'m-3'} variant="outline-light" onClick={OnContinue}>
                        Произвести впечатление на клиента
                    </Button>
                </p>
            </div>
        </Container>
    );
};
