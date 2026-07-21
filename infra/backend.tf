terraform {
  backend "gcs" {
    bucket = "mf-tfstate"
    prefix = "chart-app"
  }
}
