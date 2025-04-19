## 🚀 Get environment variables from inside the running container

```
kubectl exec -it <pod-name> -- printenv
```

### Creating KIND CLUSTER

```
kind create cluster --config kind-cluster.yml --name microservices-cluster
```


# CLUSTERIP

ClusterIp is internal to the cluster , which means it's only available to the the services inside the cluster.


```
kubectl port-forward svc/myhelloworldapp 8080:80
```