# chart-app infra

Terraform for the `gs://mf-chart-app` bucket only.

```bash
cp terraform.tfvars.example terraform.tfvars
# edit terraform.tfvars — set allowed_origins to the portal's origin(s)
terraform init
terraform plan
terraform apply
```

Remote state lives in `gs://mf-tfstate` under the `chart-app` prefix.

**CORS matters here more than it looks.** The portal fetches `remoteEntry.js`
*and* this app's CSS Module chunks cross-origin. If `allowed_origins` doesn't
include the portal's origin, the widget mounts but renders unstyled — the CSS
chunk 404s or is blocked, not the JS.
