import { ITSASElement, html, css } from './itsas-element.mjs';

class ITSASSystemMain extends ITSASElement {
    static get styles() {
        return [
            css`
                :host {
                    position: relative;
                    display: flex;
                    flex-direction: column;cur
                    justify-content: center;
                    height: 100%;
                    box-sizing: border-box;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }

                main {
                    display: flex; /* Использование flexbox для управления содержимым */
                    margin-left: 80px; /* Отступ слева, равный ширине sidebar */
                    padding: 20px; /* Отступ для внутреннего содержимого */
                    gap: 20px; /* Расстояние между блоками */
                    box-sizing: border-box; /* Учитывать padding и border в общей ширине и высоте */
                    background-color: black;
                    height: calc(100vh - 80px);
                }

                .block {
                    flex: 1; /* Каждый блок займет равное пространство */
                    padding: 15px; /* Внутренний отступ для блоков */
                    border-bottom: 4px solid var(--predictive-teal-40, #08BDB7);
                    background: var(--turing-gray-90, #1F1F26);
                }

                /* Специфические стили для графика, если это необходимо */
                .chart-container {
                    width: auto;
                    height: auto;
                }

                canvas {
                    width: 100% !important;
                    height: auto !important;
                }
            `
        ];
    }

    static get properties() {
        return {
            show: { type: Boolean, default: false }
        }
    }

    render() {
        return html`
            <main>
                <div class="block">
                    <div id="chart-container">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
                <div class="block">
                    <div id="diagram-container">
                        <canvas id="myDiagram"></canvas>
                    </div>
                </div>
            </main>
        `;
    }

    handleResponse(response) {
        return response.ok ? response.json().then((data) => data)
        : Promise.reject(new Error('Unexpected response'));
    }

    drawChart(arr) {
        console.log(arr.data)
        const ctx = this.shadowRoot.getElementById('myChart').getContext('2d');

        // Генерация данных для результата прогноза
        const data = {
            labels: [],
            datasets: [{
                backgroundColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
                label: 'Предсказание',
                label: 'Предсказание',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
            }]
        };

        arr.data.forEach(element => {
            data.labels.push(element.date);
            data.datasets[0].data.push(element.OT);
        });
        // for (let x = -2; x <= 2; x += 0.1) {
        //     data.labels.push(x.toFixed(1));
        //     data.datasets[0].data.push(x * x);
        // }

        // Создание графика
        const myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // scales: {
                //     x: {
                //         type: 'linear',
                //         position: 'bottom',
                //         min: -2,
                //         max: 2
                //     },
                //     y: {
                //         min: 0,
                //         max: 4
                //     }
                // }
            }
        });
        this.show = true;
    }

    getDate() {
        fetch('http://localhost:7000/api/start', { method: 'GET' })
              .then(this.handleResponse).then(this.drawChart.bind(this));
    }

    firstUpdated() {
        super.firstUpdated();

        this.getDate()


        // Инициализация второго графика (диаграммы)
        const ctx2 = this.shadowRoot.getElementById('myDiagram').getContext('2d');

        // Здесь вы определите данные и параметры для вашей диаграммы
        const diagramData = {
            labels: [
                'Категория 1',
                'Категория 2',
                'Категория 3',
                'Категория 4'
            ],
            datasets: [{
                label: 'Пример диаграммы',
                data: [10, 20, 30, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Создание диаграммы
        const myDiagram = new Chart(ctx2, {
            type: 'bar', // Тип диаграммы: 'bar' для столбчатой, 'doughnut' для кольцевой и т.д.
            data: diagramData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

customElements.define('itsas-system-main', ITSASSystemMain);
