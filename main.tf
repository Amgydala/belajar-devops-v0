terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

# 1. Beritahu Terraform untuk merakit Dockerfile di folder saat ini (.)
resource "docker_image" "nextjs_app" {
  name = "app-v0-lokal:latest"
  build {
    context = "."
  }
}

# 2. Nyalakan kontainer Next.js hasil rakitan tadi
resource "docker_container" "nextjs_server" {
  image = docker_image.nextjs_app.image_id
  name  = "web-nextjs-v0"

  ports {
    internal = 3000
    external = 8080 # Tetap kita buka di port 8080 biar tidak usah ubah browser
  }
}