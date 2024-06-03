
import Vt from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';

export default function ExperienceTimeline() {
    const bgColor = "#434659";
    const keyColor = "#ff6400";
    const textColor = "#fff";
    const style = {
        className: "vertical-timeline-element--work",
        contentStyle: { background: bgColor, color: textColor, boxShadow: "0 -3px " + keyColor },
        contentArrowStyle: { borderRight: '7px solid ' + bgColor },
        iconStyle: { background: keyColor, color: textColor }
    };
    const data = [
        {
            date: "2023 - 2024",
            position: "C++ Developer",
            company: "Gaijin Entertainment",
            responsibilities: "Повышение отказоустойчивости в микросервисной архитектуре. Внедрение бенчмарков и оптимизация алгоритмов."
        },
        {
            date: "2017 - 2022",
            position: "Senior Java Developer",
            company: "Noveo",
            responsibilities: "Аутсорс для зарубежных заказчиков. Перевод монолитных систем на микросервисную архитектуру. Интеграция с различными сторонними сервисами. Оптимизация алгоритмов. Руководство небольшой командой, собеседования."
        },
        {
            date: "2015 - 2017",
            position: "Java Developer",
            company: "ANT inform",
            responsibilities: "Поддержка web-портала, интеграция workflow движка для документооборота и ЭЦП."
        }
    ];
    return (
        <div class="overflow-hidden">
            <Vt.VerticalTimeline>
                {
                    data.map(it => <Vt.VerticalTimelineElement
                        date={it.date}
                        className={style.className}
                        contentStyle={style.contentStyle}
                        contentArrowStyle={style.contentArrowStyle}
                        iconStyle={style.iconStyle}
                    >
                        <h3 className="vertical-timeline-element-title">{it.position}</h3>
                        <h4 className="vertical-timeline-element-subtitle">{it.company}</h4>
                        <p>{it.responsibilities}</p>
                    </Vt.VerticalTimelineElement>)
                }
            </Vt.VerticalTimeline>
        </div>
    )
}