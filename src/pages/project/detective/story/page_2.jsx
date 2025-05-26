import {Container, Button} from 'react-bootstrap';

export default function App({OnContinue})  {
    return (
        <Container className="p-5">
            <h1 className={'noir-title p-5 text-center'}>True Noir Detective</h1>
            <div className="noir-content m-auto text-center">
                <p>
                    Посетительница не оценила этот жест...
                </p>
                <p className="text-center">
                    КОНЕЦ
                </p>
            </div>
        </Container>
    );
};
