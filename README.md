# Kubernetes Microservices Platform (Local + K8s)

## Overview
This project demonstrates an end-to-end microservice deployed on Kubernetes using Docker images, Kubernetes Deployments/Services, and Kustomize overlays. It is designed as an interview-ready reference for containerization, deployment, and troubleshooting.

## Architecture (High Level)
Client (Browser/Curl)
  → kubectl port-forward
  → Kubernetes Service (ClusterIP)
  → Pod (Deployment)
  → Node.js API

## Tech Stack
- Docker
- Kubernetes (Docker Desktop)
- Kustomize overlays
- Node.js (Express)

## Project Structure
- `services/` — application services (order-service, user-service, payment-service)
- `k8s/base` — shared Kubernetes manifests
- `k8s/overlays/dev` — dev overlay (Kustomize)

## How to Run (Kubernetes)
### 1) Build Docker image
```bash
cd services/order-service
docker build -t order-service:local .
