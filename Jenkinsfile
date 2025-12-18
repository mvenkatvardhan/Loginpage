pipeline {
    agent any

    environment {
        IMAGE_NAME = "venkatvardhan/loginpage"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'mvn test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    bat "docker build -t %IMAGE_NAME%:%BUILD_NUMBER% ."
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    docker push %IMAGE_NAME%:%BUILD_NUMBER%
                    '''
                }
            }
        }
    }
}
