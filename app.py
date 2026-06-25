from flask import Flask, jsonify
import subprocess
import psutil

app = Flask(__name__)

@app.route('/stats')
def stats():

    cpu = psutil.cpu_percent(interval=1)

    memory = psutil.virtual_memory().percent

    disk = psutil.disk_usage('/').percent

    containers = subprocess.check_output(
        "docker ps -q | wc -l",
        shell=True
    ).decode().strip()

    return jsonify({
        "cpu": cpu,
        "memory": memory,
        "disk": disk,
        "containers": containers
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
