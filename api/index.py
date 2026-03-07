import os
import sys

# Ensure ml-backend is in the path for relative imports inside it
backend_path = os.path.join(os.path.dirname(__file__), '..', 'ml-backend')
sys.path.append(backend_path)

# Change current directory to ml-backend so relative file paths (.env) still work
os.chdir(backend_path)

from main import app

# This 'app' will be used by Vercel for the /api routes
