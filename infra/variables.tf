variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCS bucket location"
  type        = string
  default     = "europe-west3"
}

variable "allowed_origins" {
  description = "Origins allowed to fetch remoteEntry.js and CSS chunks (the portal origin(s))"
  type        = list(string)
}
