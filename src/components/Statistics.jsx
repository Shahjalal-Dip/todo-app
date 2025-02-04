import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Statistics({ todos }) {
    const completedTasks = todos.filter(todo => todo.is_completed).length;
    const totalTasks = todos.length;
    const pendingTasks = totalTasks - completedTasks;

    const data = {
        labels: ["Completed", "Pending"],
        datasets: [{
            data: [completedTasks, pendingTasks],
            backgroundColor: ["#28a745", "#ff4d4d"]
        }]
    };

    return (
        <div className="chart">
            <h2 >Task Statistics</h2><br />
            <Pie data={data} />
        </div>
    );
}
