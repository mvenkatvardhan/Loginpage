node {

    stage('Checkout') {
        git branch: 'master',
            url: 'https://github.com/mvenkatvardhan/Loginpage.git'
    }

    stage('Build Backend') {
        dir('backend') {
            bat 'mvn clean package -DskipTests'
        }
    }

    stage('Build Frontend') {
        dir('frontend') {
            bat 'npm install'
            bat 'npm run build'
        }
    }

    stage('Docker Build Backend') {
        dir('backend') {
            bat 'docker build -t project1-backend .'
        }
    }

    stage('Docker Build Frontend') {
        dir('frontend') {
            bat 'docker build -t project1-frontend .'
        }
    }

    stage('Run Containers') {
        bat 'docker-compose up -d'
    }

}
