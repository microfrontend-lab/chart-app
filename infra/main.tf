terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.project_id
}

resource "google_storage_bucket" "app" {
  name                        = "mf-chart-app"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = var.allowed_origins
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["Content-Type", "Range"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket_iam_member" "public_read" {
  bucket = google_storage_bucket.app.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}
