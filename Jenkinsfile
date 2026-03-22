pipeline {
    agent any 

    // Tell Jenkins to load the Node.js tool we just configured
    tools {
        nodejs 'Node20' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling the latest marketplace code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js backend packages...'
                // Tell Jenkins to go into the correct folder first
                dir('Firma-aarf101/backend') {
                    sh 'npm install' 
                }
            }
        }

        stage('Security Check') {
            steps {
                echo 'Running a quick check for vulnerable packages...'
                // We also need to be in that folder for npm audit!
                dir('Firma-aarf101/backend') {
                    sh 'npm audit --audit-level=high || true'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'No automated tests written yet. Skipping test phase safely!'
            }
        }

        stage('Docker Build (Dry Run)') {
            steps {
                echo 'Building the Docker image to ensure the Dockerfile works...'
                dir('Firma-aarf101') {
                    // We will tag (-t) the image as "marketplace-app"
                    sh 'docker build -t marketplace-app .'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                echo 'Deploying the new marketplace container locally...'
                
                // 1. Stop and remove the old version of the website (if it's running)
                sh 'docker rm -f my-marketplace-website || true'
                
                // 2. Start the brand new version we just built!
                // Mapped to 8080 on your machine, pointing to 80 (Nginx) inside the container
                sh 'docker run -d -p 8080:80 --name my-marketplace-website marketplace-app'
            }
        }
    }
}
