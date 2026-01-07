# 🚀 Kubernetes Microservices Platform (End-to-End)

An end-to-end **Kubernetes-based microservices platform** built with **Node.js, Docker, and Kubernetes**, demonstrating real-world service communication, containerization, deployment, debugging, and Git workflows commonly expected in DevOps and Cloud Engineering interviews.

---

## 📌 Key Highlights

* Dockerized **Node.js microservices**
* Kubernetes **Deployments & Services**
* **Gateway-based routing** using Kubernetes DNS
* Real-world **debugging of port mismatches & service connectivity**
* Local Kubernetes cluster (Docker Desktop)
* Production-style Git workflow

---

## 🧱 Architecture Overview

```
Client
  |
  v
[ Gateway Service ]  (NodePort :30080)
  |
  +--> Order Service      (ClusterIP)
  |
  +--> Inventory Service  (ClusterIP)
```

### Services

| Service           | Description                  |
| ----------------- | ---------------------------- |
| Gateway           | Entry point for all requests |
| Order Service     | Handles order data           |
| Inventory Service | Handles inventory data       |
| User Service      | Sample user microservice     |

---

## 🛠 Tech Stack

* **Language:** Node.js
* **Containerization:** Docker
* **Orchestration:** Kubernetes
* **Local Cluster:** Docker Desktop
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
k8s-microservices-platform/
│
├── services/
│   ├── gateway/
│   ├── order-service/
│   ├── inventory-service/
│   └── user-service/
│
├── k8s/
│   ├── all-in-one.yaml
│   └── overlays/
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

* Docker Desktop (with Kubernetes enabled)
* Node.js (v18+)
* kubectl
* Git

---

### 2️⃣ Build Docker Images

```bash
docker build -t gateway:local services/gateway
docker build -t order-service:local services/order-service
docker build -t inventory-service:local services/inventory-service
docker build -t user-service:local services/user-service
```

Verify:

```bash
docker images
```

---

### 3️⃣ Deploy to Kubernetes

```bash
kubectl apply -f k8s/all-in-one.yaml
```

Check pods:

```bash
kubectl get pods -n ms
```

---

### 4️⃣ Access the Application

| Endpoint  | URL                                                                  |
| --------- | -------------------------------------------------------------------- |
| Health    | [http://localhost:30080/health](http://localhost:30080/health)       |
| Orders    | [http://localhost:30080/orders](http://localhost:30080/orders)       |
| Inventory | [http://localhost:30080/inventory](http://localhost:30080/inventory) |

---

## 🧠 Debugging & Learnings (Interview Gold)

### ✔ Fixed Service Port Mismatch

* Order service was running on **3001**, but Kubernetes service exposed **3000**
* Identified via:

  * `kubectl logs`
  * `kubectl exec` + in-cluster service calls
* Fixed by aligning **containerPort, service targetPort, and gateway env vars**

### ✔ Windows + OneDrive Git Locks

* Resolved Git rebase/reset failures caused by OneDrive file locks
* Migrated repo to a non-synced directory for clean Git operations

---

## 📈 What This Project Demonstrates

* Real Kubernetes networking knowledge
* Hands-on Docker image building
* Production-style debugging
* Clean Git workflows
* Microservices communication using Kubernetes DNS

---

## 🔮 Future Enhancements

* Liveness & readiness probes
* Horizontal Pod Autoscaler (HPA)
* CI/CD with Jenkins
* Monitoring with Prometheus & Grafana
* Centralized logging (ELK)

---

## 👤 Author

**Swecha Siddamshetty**
Cloud / DevOps Engineer
GitHub: [https://github.com/swecha3108](https://github.com/swecha3108)
