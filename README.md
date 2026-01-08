# 🚀Kubernetes Microservices Platform

A production‑style **Kubernetes microservices platform** built with Node.js and Docker, deployed on **Docker Desktop Kubernetes**. The project demonstrates service‑to‑service communication, an API Gateway pattern, health probes, resource management, and NodePort exposure.

---

## ✨ Features

* API Gateway pattern (single external entry point)
* Independent microservices (Order, Inventory)
* Kubernetes Deployments & Services
* Liveness & Readiness Probes
* Resource requests & limits
* NodePort exposure for local access
* Clean repo (no `node_modules` committed)

---

## 🏗 Architecture

```
Client (Browser / PowerShell)
        |
        |  NodePort :30080
        v
+-------------------+
|   Gateway Service |
|   (Node.js)       |
+-------------------+
      |        |
      |        |
      v        v
+-----------+  +----------------+
| Order     |  | Inventory      |
| Service   |  | Service        |
| :3001     |  | :3000          |
+-----------+  +----------------+
```

* **Gateway** is the only externally exposed service
* Internal services communicate via Kubernetes DNS

  * `http://order-service:3001`
  * `http://inventory-service:3000`

---

## 📁 Project Structure

```
.
├── k8s/
│   └── all-in-one.yaml        # Namespace, Deployments, Services
├── services/
│   ├── gateway/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── server.js
│   ├── order-service/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── app.js
│   └── inventory-service/
│       ├── Dockerfile
│       ├── package.json
│       └── server.js
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Docker Desktop (Kubernetes enabled)
* kubectl
* Node.js (for local builds if needed)

Verify Kubernetes:

```bash
kubectl get nodes
```

---

## 🐳 Build Docker Images (local)

From the project root:

```bash
docker build -t gateway:local services/gateway
docker build -t order-service:local services/order-service
docker build -t inventory-service:local services/inventory-service
```

> Images use `imagePullPolicy: IfNotPresent` to work with local Docker Desktop images.

---

## ☸ Deploy to Kubernetes

Apply all manifests:

```bash
kubectl apply -f k8s/all-in-one.yaml
```

Verify:

```bash
kubectl get pods -n ms
kubectl get svc -n ms
```

---

## 🌐 Access the Application

The Gateway is exposed via **NodePort**:

```
http://localhost:30080
```

### Test Endpoints

#### Orders

```powershell
iwr http://localhost:30080/orders -UseBasicParsing
```

Response:

```json
[{"id":"ord-1001","item":"sample","status":"created"}]
```

#### Inventory

```powershell
iwr http://localhost:30080/inventory -UseBasicParsing
```

Response:

```json
{
  "inventory": [
    {"sku":"coffee","available":120},
    {"sku":"tea","available":80}
  ]
}
```

---

## ❤️ Health Checks

Each service exposes `/health` and is configured with:

* **Liveness Probe** – restarts unhealthy containers
* **Readiness Probe** – controls traffic routing

Example:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
```

---

## 📊 Resource Management

All services define resource constraints:

```yaml
resources:
  requests:
    cpu: "50m"
    memory: "64Mi"
  limits:
    cpu: "200m"
    memory: "256Mi"
```

---

## 🧪 Debugging Tips

```bash
kubectl logs -n ms deploy/gateway
kubectl describe pod -n ms <pod-name>
kubectl rollout restart deploy/gateway -n ms
```

Use dry‑run to validate YAML:

```bash
kubectl apply -f k8s/all-in-one.yaml --dry-run=client
```

---

## 🔒 Best Practices Followed

* No `node_modules` committed
* Single external entry point
* Service‑to‑service DNS
* Explicit container ports
* Declarative Kubernetes configs

---

## 📌 Future Enhancements

* Kubernetes Ingress (NGINX)
* Horizontal Pod Autoscaler (HPA)
* ConfigMaps & Secrets
* CI/CD with GitHub Actions
* Helm charts

---

## 👤 Author

Built by **Swecha Siddamshetty** as a hands‑on Kubernetes & DevOps portfolio project.
GitHub: https://github.com/swecha3108


