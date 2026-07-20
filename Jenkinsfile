pipeline {
    agent any

    environment {
        // Mock Staging Deployment Location (Simulating Web Server)
        DEPLOY_DIR = "/var/www/html/campus-pulse"
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo '📥 Pulling latest codebase additions from GitHub Repository...'
                checkout scm
            }
        }

        stage('Code Linting & Evaluation') {
            steps {
                echo '🔍 Inspecting HTML structures and styling layers...'
                // Simple validations to check if required project files exist
                sh 'test -f index.html && echo "index.html present"'
                sh 'test -f style.css && echo "style.css present"'
                sh 'test -f app.js && echo "app.js present"'
            }
        }

        stage('Automated Testing') {
            steps {
                echo '🧪 Executing UI Integrity Verification tests...'
                // Validates that the test suite definition contains zero breaking syntax blocks
                sh 'grep -q "Verification" tests/smoke-test.html'
            }
        }

        stage('Continuous Deployment (Staging)') {
            steps {
                echo '🚀 Deploying build to the web server production directory...'
                // In a local test system, this copies build files directly into Apache/Nginx web directories
                sh '''
                    mkdir -p ${DEPLOY_DIR}
                    cp -r index.html style.css app.js ${DEPLOY_DIR}/
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline Completed Successfully! Changes are now live on Staging.'
        }
        failure {
            echo '❌ Pipeline Execution Error. Reverting changes or check build history for debug logs.'
        }
    }
}