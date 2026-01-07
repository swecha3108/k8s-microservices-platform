# 🚀 Kubernetes Microservices Platform (End-to-End)

An end-to-end **Kubernetes microservices platform** built with **Node.js, Docker, and Kubernetes**.  
It demonstrates **service discovery (K8s DNS)**, **gateway routing**, **Deployments/Services**, and real-world debugging (e.g., port mismatch causing connection refused).

---

## 📌 Key Highlights

- Dockerized Node.js microservices
- Kubernetes Deployments + Services (ClusterIP)
- API Gateway exposed via NodePort for local access
- In-cluster service-to-service calls using Kubernetes DNS (`http://order-service:PORT/...`)
- Real debugging: fixed “connection refused” by aligning app ports with `containerPort`/`targetPort`
- Clean repo structure for CI/CD readiness

---

## 🧱 Architecture Overview

```
Client (browser/curl)
  |
  v
[ Gateway Service ]  (NodePort :30080)
  |
  +--> Order Service      (ClusterIP)
  |
  +--> Inventory Service  (ClusterIP)

- **Gateway** is the entry point exposed to localhost.
- **Order/Inventory** are internal services reachable via Kubernetes DNS.
- Kubernetes Services provide stable networking and load balancing to pods.
```

## Services

| Service | Type | Purpose |
|--------|------|---------|
| gateway | NodePort | Routes external requests to internal services |
| order-service | ClusterIP | Returns order data |
| inventory-service | ClusterIP | Returns inventory data |
| user-service | ClusterIP | Sample user microservice (optional route if wired) |
| payment-service | ClusterIP | Payment microservice (optional route if wired) |

---

## Routes (Gateway)

Base URL (local):  
`http://localhost:30080`

| Route | Description |
|------|-------------|
| `/health` | Gateway health check |
| `/orders` | Fetch orders via order-service |
| `/inventory` | Fetch inventory via inventory-service |

> If you later add them, you can also expose:
> - `/users`
> - `/payments`

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
├─ services/
│ ├─ gateway/
│ ├─ order-service/
│ ├─ inventory-service/
│ ├─ user-service/
│ └─ payment-service/
├─ k8s/
│ ├─ all-in-one.yaml
│ └─ overlays/
├─ .gitignore
└─ README.md
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
docker build -t payment-service:local services/payment-service
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
kubectl get ns
kubectl get pods -n ms
kubectl get svc -n ms
```

---

### 4️⃣ Access the Application

| Endpoint  | URL                                                                  |
| --------- | -------------------------------------------------------------------- |
| Health    | [http://localhost:30080/health](http://localhost:30080/health)       |
| Orders    | [http://localhost:30080/orders](http://localhost:30080/orders)       |
| Inventory | [http://localhost:30080/inventory](http://localhost:30080/inventory) |

---

## 🧠 Debugging & Learnings 

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
## ✔ Common Commands
# Re-deploy
kubectl apply -f k8s/all-in-one.yaml

# Restart deployments
kubectl rollout restart deploy/gateway -n ms
kubectl rollout restart deploy/order-service -n ms
kubectl rollout restart deploy/inventory-service -n ms

# Logs
kubectl logs -n ms deploy/gateway --tail=100
kubectl logs -n ms deploy/order-service --tail=100
kubectl logs -n ms deploy/inventory-service --tail=100

# Describe
kubectl describe svc gateway -n ms
kubectl describe deploy order-service -n ms

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
