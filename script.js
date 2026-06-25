let cpuData = [];
let labels = [];

const ctx =
document.getElementById('cpuChart');

const cpuChart = new Chart(ctx, {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'CPU Usage',
data: cpuData,
borderColor: '#00ff88',
borderWidth: 3
}]
}
});

async function loadStats() {

try {

const response =
await fetch("http://localhost:5000/stats");

const data =
await response.json();

document.getElementById("cpu")
.innerHTML = data.cpu + "%";

document.getElementById("memory")
.innerHTML = data.memory + "%";

document.getElementById("disk")
.innerHTML = data.disk + "%";

document.getElementById("container")
.innerHTML = data.containers;

labels.push(
new Date().toLocaleTimeString()
);

cpuData.push(data.cpu);

if(cpuData.length > 15){
cpuData.shift();
labels.shift();
}

cpuChart.update();

}
catch(err){
console.log(err);
}

}

loadStats();

setInterval(loadStats,3000);
