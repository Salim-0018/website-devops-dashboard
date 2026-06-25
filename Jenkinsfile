pipeline {

agent any

stages {

stage('Build') {

steps {

sh 'docker build -t devops-dashboard .'

}

}

stage('Deploy') {

steps {

sh '''
docker stop dashboard || true
docker rm dashboard || true

docker run -d \
--name dashboard \
-p 8080:80 \
devops-dashboard
'''

}

}

}

}
