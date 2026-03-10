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
                dir('Firma-main/Back') {
                    sh 'npm install' 
                }
            }
        }

        stage('Security Check') {
            steps {
                echo 'Running a quick check for vulnerable packages...'
                // We also need to be in that folder for npm audit!
                dir('Firma-main/Back') {
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
                dir('Firma-main') {
                    // We will tag (-t) the image as "marketplace-app"
                    sh 'docker build -t marketplace-app .'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Ready to deploy to your free hosting platform!'
            }
        }
    }
}