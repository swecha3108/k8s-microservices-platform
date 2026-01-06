# Kubernetes Microservices Platform

An end-to-end Kubernetes-based microservices platform that demonstrates
real-world cloud-native application design, deployment, CI/CD automation,
monitoring, and troubleshooting.

## Architecture Overview

This platform consists of multiple microservices running on Kubernetes.

**Services**
- User Service
- Order Service
- Payment Service

**Platform**
- Docker for containerization
- Kubernetes for orchestration
- CI/CD for automated builds/deploy readiness
- Prometheus + Grafana for monitoring

## How to Run Locally

### Prerequisites
- Docker Desktop
- Kubernetes enabled (Docker Desktop / Minikube)
- kubectl

### Build Docker Images
```bash
docker build -t user-service:local ./services/user-service
docker build -t order-service:local ./services/order-service
docker build -t payment-service:local ./services/payment-service

