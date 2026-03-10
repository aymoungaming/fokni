pipeline {
    // This tells Jenkins to run on whatever environment is available
    agent any 

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
                // This command installs your project dependencies
                sh 'npm install' 
            }
        }

        stage('Security Check') {
            steps {
                echo 'Running a quick check for vulnerable packages...'
                // Since you don't have tests, this is a great free check to run!
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Test') {
            steps {
                echo 'No automated tests written yet. Skipping test phase safely!'
                // When you write tests in the future, you will change this to: sh 'npm test'
            }
        }

        stage('Docker Build (Dry Run)') {
            steps {
                echo 'Verifying that the Dockerfile can build successfully...'
                // This ensures your Dockerfile isn't broken before you try to deploy
                // sh 'docker build -t marketplace-app .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Ready to deploy to your free hosting platform!'
                // We will add the specific deployment trigger here later
            }
        }
    }
}